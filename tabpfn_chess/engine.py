"""Canonical TabPFN evaluation and deterministic search for CLI, API and benchmarks."""

import math
from pathlib import Path

import chess
import numpy as np
import pandas as pd

from .model_registry import InContextModel, get_in_context_model
from .preprocess import extract_features, get_feature_names

PIECE_VALUES = {
    chess.PAWN: 100,
    chess.KNIGHT: 300,
    chess.BISHOP: 300,
    chess.ROOK: 500,
    chess.QUEEN: 900,
    chess.KING: 0,
}
MATE_SCORE = 100000
POSITIONAL_BONUS = 100
QUIESCENCE_DEPTH = 4
REFERENCE_PATH = Path(__file__).parent / "data" / "reference_data.parquet"


def material_score(board: chess.Board) -> int:
    return sum(
        value * (len(board.pieces(piece, chess.WHITE)) - len(board.pieces(piece, chess.BLACK)))
        for piece, value in PIECE_VALUES.items()
    )


def terminal_score(board: chess.Board, ply: int = 0) -> float | None:
    if board.is_checkmate():
        return (-1 if board.turn else 1) * (MATE_SCORE - ply)
    # Match chess.js: claim draws already reached, not prospective claims.
    if (
        board.is_stalemate()
        or board.is_insufficient_material()
        or board.is_fifty_moves()
        or board.is_repetition(3)
    ):
        return 0.0
    return None


def move_priority(board: chess.Board, move: chess.Move) -> int:
    captured = board.piece_type_at(move.to_square)
    gain = 100 if board.is_en_passant(move) else PIECE_VALUES[captured] if captured else 0
    promotion = PIECE_VALUES[move.promotion] - 100 if move.promotion else 0
    return 10 * (gain + promotion) - PIECE_VALUES[board.piece_type_at(move.from_square)]


def ordered_moves(board: chess.Board) -> list[chess.Move]:
    return sorted(board.legal_moves, key=lambda m: (-move_priority(board, m), m.uci()))


def quiescence(
    board: chess.Board,
    remaining: int = QUIESCENCE_DEPTH,
    alpha: float = -math.inf,
    beta: float = math.inf,
    ply: int = 0,
) -> float:
    """White's material score after legal captures, promotions and evasions."""
    terminal = terminal_score(board, ply)
    if terminal is not None:
        return terminal
    stand_pat = float(material_score(board))
    in_check = board.is_check()
    if remaining <= 0 and (not in_check or remaining < 0):
        return stand_pat
    maximizing = board.turn == chess.WHITE
    best = (-math.inf if maximizing else math.inf) if in_check else stand_pat
    if maximizing:
        alpha = max(alpha, best)
    else:
        beta = min(beta, best)
    if alpha >= beta:
        return best
    for move in ordered_moves(board):
        if not (in_check or board.is_capture(move) or move.promotion):
            continue
        board.push(move)
        value = quiescence(board, remaining - 1, alpha, beta, ply + 1)
        board.pop()
        best = max(best, value) if maximizing else min(best, value)
        if maximizing:
            alpha = max(alpha, best)
        else:
            beta = min(beta, best)
        if alpha >= beta:
            break
    return best


class SearchTreeNode:
    def __init__(self, board: chess.Board, move_from_parent: chess.Move | None = None, depth: int = 0):
        self.board = board
        self.move = move_from_parent
        self.depth = depth
        self.children: list[SearchTreeNode] = []
        self.leaf_idx: int | None = None
        self.minimax_value = 0.0
        self.san = ""
        self.best_child: SearchTreeNode | None = None
        self.terminal = terminal_score(board, depth)
        self.tactical_cp = 0.0


def build_search_tree(
    node: SearchTreeNode,
    max_depth: int,
    beams: list[int],
    all_leaf_boards: list[chess.Board],
    use_tactical_safety: bool = True,
) -> None:
    board = node.board
    if node.terminal is not None:
        return
    if node.depth >= max_depth:
        node.leaf_idx = len(all_leaf_boards)
        all_leaf_boards.append(board)
        if use_tactical_safety:
            node.tactical_cp = quiescence(board, ply=node.depth)
        return
    moves = ordered_moves(board)
    # Keep all root moves and immediate replies. Deeper nodes retain all forcing
    # moves and check evasions, plus a bounded quiet-move beam.
    if node.depth >= 2 and not board.is_check():
        width = beams[min(node.depth, len(beams) - 1)]
        quiet = [m for m in moves if not (board.is_capture(m) or m.promotion or board.gives_check(m))]
        keep = set(quiet[:width])
        moves = [m for m in moves if m in keep or board.is_capture(m) or m.promotion or board.gives_check(m)]
    for move in moves:
        child_board = board.copy()
        child_board.push(move)
        child = SearchTreeNode(child_board, move, node.depth + 1)
        child.san = board.san(move)
        node.children.append(child)
        build_search_tree(child, max_depth, beams, all_leaf_boards, use_tactical_safety)


def probability_to_cp(probability: float) -> float:
    probability = min(1 - 1e-6, max(1e-6, probability))
    return 400 * math.log10(probability / (1 - probability))


def cp_to_probability(score: float) -> float:
    if abs(score) >= MATE_SCORE / 2:
        return 1.0 if score > 0 else 0.0
    return 1 / (1 + 10 ** (-max(-10000, min(10000, score)) / 400))


def propagate_minimax(
    node: SearchTreeNode, leaf_evals: np.ndarray, root_turn: chess.Color, use_tactical_safety: bool = True
) -> float:
    if node.terminal is not None:
        white_score = node.terminal
    elif node.leaf_idx is not None:
        probability = float(leaf_evals[node.leaf_idx])
        assert math.isfinite(probability) and 0 <= probability <= 1, "Invalid model probability"
        if use_tactical_safety:
            white_score = node.tactical_cp
            if abs(white_score) < MATE_SCORE / 2:
                white_score += POSITIONAL_BONUS * (2 * probability - 1)
        else:
            white_score = probability_to_cp(probability)
    else:
        for child in node.children:
            propagate_minimax(child, leaf_evals, root_turn, use_tactical_safety)
        maximizing = node.board.turn == root_turn
        node.best_child = min(
            node.children, key=lambda c: (-c.minimax_value if maximizing else c.minimax_value, c.move.uci())
        )
        node.minimax_value = node.best_child.minimax_value
        return node.minimax_value
    node.minimax_value = white_score if root_turn == chess.WHITE else -white_score
    return node.minimax_value


def rank_tree(root: SearchTreeNode, predictions: np.ndarray, use_tactical_safety: bool = True) -> list[dict]:
    propagate_minimax(root, predictions, root.board.turn, use_tactical_safety)
    baseline = material_score(root.board) * (1 if root.board.turn else -1)
    ranked = []
    for child in root.children:
        pv = []
        current = child
        while current is not None:
            pv.append(current.san)
            current = current.best_child
        score = child.minimax_value
        white_score = score if root.board.turn else -score
        ranked.append(
            {
                "move": child.move,
                "uci": child.move.uci(),
                "san": child.san,
                "score_cp": score,
                "white_win_prob": cp_to_probability(white_score),
                "player_win_prob": cp_to_probability(score),
                "pv": pv,
                "safety_delta": -math.tanh(max(0, baseline - score) / 500) if use_tactical_safety else 0.0,
            }
        )
    return sorted(ranked, key=lambda item: (-item["score_cp"], item["uci"]))


class InContextChessEngine:
    def __init__(
        self,
        in_context_data_path: str | None = None,
        model_family: str = "tabpfn",
        model_version: str = "3.5",
        model: InContextModel | None = None,
        device: str = "auto",
        max_in_context: int = 100,
        random_state: int = 42,
        use_extra_features: bool = True,
    ):
        assert max_in_context > 0
        self.feature_cols = get_feature_names()
        df = pd.read_parquet(REFERENCE_PATH if in_context_data_path is None else in_context_data_path)
        X = df[self.feature_cols].to_numpy(dtype=np.float32)
        y = df["target_win_prob"].to_numpy(dtype=np.float32)
        assert X.ndim == 2 and X.shape[1] == 787 and len(X) == len(y)
        assert np.isfinite(X).all() and np.isfinite(y).all()
        assert ((y >= 0) & (y <= 1)).all()
        assert len(X) >= max_in_context, f"Requested {max_in_context} positions, only {len(X)} available"
        self.X_train = X[:max_in_context].copy()
        self.y_train = y[:max_in_context].copy()
        self.use_extra_features = use_extra_features
        if not use_extra_features:
            self.X_train[:, 773:] = 0
        self.model_family = model_family
        self.model_version = model_version
        self.model = (
            model
            if model is not None
            else get_in_context_model(
                family=model_family, version=model_version, device=device, random_state=random_state
            )
        )
        self.model.fit(self.X_train, self.y_train)

    def rank_moves(
        self,
        board: chess.Board,
        horizon_moves: int = 1,
        use_tactical_safety: bool = True,
        beam_width: int = 4,
    ) -> list[dict]:
        assert board.is_valid(), f"Invalid board: {board.fen()}"
        assert horizon_moves in (0, 1, 2), "Supported horizons: 0 (1-ply), 1 (2-ply), 2 (4-ply)"
        assert beam_width > 0
        root = SearchTreeNode(board.copy())
        if root.terminal is not None:
            return []
        leaves: list[chess.Board] = []
        build_search_tree(root, max(1, horizon_moves * 2), [beam_width], leaves, use_tactical_safety)
        predictions = np.empty(0)
        if leaves:
            features = np.stack([extract_features(b) for b in leaves])
            if not self.use_extra_features:
                features[:, 773:] = 0
            predictions = np.asarray(self.model.predict(features), dtype=float)
            assert predictions.shape == (len(leaves),), "Model must return one scalar per position"
            assert np.isfinite(predictions).all(), "Model returned non-finite predictions"
            predictions = np.clip(predictions, 0, 1)
        return rank_tree(root, predictions, use_tactical_safety)

    def select_best_move(
        self,
        board: chess.Board,
        horizon_moves: int = 1,
        use_tactical_safety: bool = True,
        beam_width: int = 4,
    ) -> tuple[chess.Move, float, list[dict]]:
        ranked = self.rank_moves(board, horizon_moves, use_tactical_safety, beam_width)
        assert ranked, "No moves available: game is over"
        return ranked[0]["move"], ranked[0]["player_win_prob"], ranked

    def play_move(
        self,
        board: chess.Board,
        horizon_moves: int = 1,
        use_tactical_safety: bool = True,
        beam_width: int = 4,
    ) -> tuple[chess.Move, float, list[dict]]:
        result = self.select_best_move(board, horizon_moves, use_tactical_safety, beam_width)
        board.push(result[0])
        return result


TabPFNChessEngine = InContextChessEngine
