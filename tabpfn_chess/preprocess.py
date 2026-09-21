import argparse
import json
import math
import os

import chess
import numpy as np
import pandas as pd

PIECE_SYMBOLS = ["P", "N", "B", "R", "Q", "K", "p", "n", "b", "r", "q", "k"]
PIECE_VALUES = {
    chess.PAWN: 1.0,
    chess.KNIGHT: 3.0,
    chess.BISHOP: 3.0,
    chess.ROOK: 5.0,
    chess.QUEEN: 9.0,
    chess.KING: 0.0,
}
CENTER_SQUARES = [chess.E4, chess.D4, chess.E5, chess.D5]


def count_passed_pawns(board: chess.Board, color: chess.Color) -> int:
    pawns = board.pieces(chess.PAWN, color)
    opp_pawns = board.pieces(chess.PAWN, not color)
    count = 0
    for sq in pawns:
        f = chess.square_file(sq)
        r = chess.square_rank(sq)
        is_passed = True
        for opp_sq in opp_pawns:
            opp_f = chess.square_file(opp_sq)
            opp_r = chess.square_rank(opp_sq)
            if abs(opp_f - f) <= 1:
                if color == chess.WHITE and opp_r > r:
                    is_passed = False
                    break
                elif color == chess.BLACK and opp_r < r:
                    is_passed = False
                    break
        if is_passed:
            count += 1
    return count


def get_feature_names() -> list[str]:
    names = []
    # 768 square-piece features
    for sq in range(64):
        sq_name = chess.square_name(sq)
        for p in PIECE_SYMBOLS:
            names.append(f"sq_{sq_name}_{p}")

    # 5 board state metadata features
    names.extend(
        [
            "turn_white",
            "castling_white_kingside",
            "castling_white_queenside",
            "castling_black_kingside",
            "castling_black_queenside",
        ]
    )

    # 7 heuristic features
    names.extend(
        [
            "material_delta",
            "is_in_check",
            "center_control_white",
            "center_control_black",
            "mobility_active",
            "has_bishop_pair_white",
            "has_bishop_pair_black",
        ]
    )

    # 7 additional basic domain metadata features
    names.extend(
        [
            "halfmove_clock",
            "fullmove_number",
            "has_en_passant",
            "total_pieces",
            "total_material",
            "white_passed_pawns",
            "black_passed_pawns",
        ]
    )

    assert len(names) == 787, f"Expected 787 feature names, got {len(names)}"
    return names


def extract_features(board: chess.Board) -> np.ndarray:
    feats = np.zeros(787, dtype=np.float32)
    idx = 0

    # 768 piece-square occupancy
    for sq in range(64):
        piece = board.piece_at(sq)
        for p in PIECE_SYMBOLS:
            if piece is not None and piece.symbol() == p:
                feats[idx] = 1.0
            idx += 1

    # 5 board state metadata features
    feats[idx] = 1.0 if board.turn == chess.WHITE else 0.0
    idx += 1
    feats[idx] = 1.0 if board.has_kingside_castling_rights(chess.WHITE) else 0.0
    idx += 1
    feats[idx] = 1.0 if board.has_queenside_castling_rights(chess.WHITE) else 0.0
    idx += 1
    feats[idx] = 1.0 if board.has_kingside_castling_rights(chess.BLACK) else 0.0
    idx += 1
    feats[idx] = 1.0 if board.has_queenside_castling_rights(chess.BLACK) else 0.0
    idx += 1

    # Material delta (White - Black) and total material
    white_mat = sum(len(board.pieces(pt, chess.WHITE)) * val for pt, val in PIECE_VALUES.items())
    black_mat = sum(len(board.pieces(pt, chess.BLACK)) * val for pt, val in PIECE_VALUES.items())
    feats[idx] = white_mat - black_mat
    idx += 1

    # In check
    feats[idx] = 1.0 if board.is_check() else 0.0
    idx += 1

    # Center control
    feats[idx] = sum(1 for sq in CENTER_SQUARES if board.is_attacked_by(chess.WHITE, sq))
    idx += 1
    feats[idx] = sum(1 for sq in CENTER_SQUARES if board.is_attacked_by(chess.BLACK, sq))
    idx += 1

    # Mobility
    feats[idx] = float(len(list(board.legal_moves)))
    idx += 1

    # Bishop pairs
    feats[idx] = 1.0 if len(board.pieces(chess.BISHOP, chess.WHITE)) >= 2 else 0.0
    idx += 1
    feats[idx] = 1.0 if len(board.pieces(chess.BISHOP, chess.BLACK)) >= 2 else 0.0
    idx += 1

    # 7 additional basic domain metadata features
    feats[idx] = float(board.halfmove_clock)
    idx += 1
    feats[idx] = float(board.fullmove_number)
    idx += 1
    feats[idx] = 1.0 if board.ep_square is not None else 0.0
    idx += 1
    feats[idx] = float(len(board.piece_map()))
    idx += 1
    feats[idx] = float(white_mat + black_mat)
    idx += 1
    feats[idx] = float(count_passed_pawns(board, chess.WHITE))
    idx += 1
    feats[idx] = float(count_passed_pawns(board, chess.BLACK))
    idx += 1

    assert idx == 787, f"Expected 787 features filled, got {idx}"
    return feats


def compute_targets(cp: int | None, mate: int | None) -> tuple[float, float]:
    # Returns (win_probability, cp_clipped)
    if mate is not None:
        if mate > 0:
            effective_cp = 1000.0
        else:
            effective_cp = -1000.0
    else:
        assert cp is not None, "Both cp and mate cannot be None"
        effective_cp = float(np.clip(cp, -1000.0, 1000.0))

    # Bounded regression target; this is not a calibrated game-outcome probability.
    win_prob = 1.0 / (1.0 + math.pow(10.0, -effective_cp / 400.0))
    assert 0.0 <= win_prob <= 1.0, f"Win probability {win_prob} out of bounds [0, 1]"
    return win_prob, effective_cp


def preprocess_dataset(raw_path: str, output_path: str) -> None:
    assert os.path.exists(raw_path), f"Raw data file not found: {raw_path}"
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)

    rows = []
    with open(raw_path, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                rows.append(json.loads(line))

    assert len(rows) > 0, "Raw dataset is empty"
    print(f"Loaded {len(rows)} raw positions from {raw_path}")

    feature_names = get_feature_names()
    X_list = []
    win_probs = []
    cp_clipped_list = []
    fens = []

    for item in rows:
        fen = item["fen"]
        board = chess.Board(fen)
        assert board.is_valid(), f"Encountered invalid board FEN: {fen}"

        feat_vec = extract_features(board)
        win_prob, cp_clipped = compute_targets(item["cp"], item["mate"])

        X_list.append(feat_vec)
        win_probs.append(win_prob)
        cp_clipped_list.append(cp_clipped)
        fens.append(fen)

    X_mat = np.stack(X_list, axis=0)
    assert X_mat.shape == (len(rows), 787), f"Expected shape ({len(rows)}, 787), got {X_mat.shape}"

    df = pd.DataFrame(X_mat, columns=feature_names)
    df["target_win_prob"] = np.array(win_probs, dtype=np.float32)
    df["target_cp_clipped"] = np.array(cp_clipped_list, dtype=np.float32)
    df["fen"] = fens

    assert not df.isna().any().any(), "Preprocessed dataset contains NaN values"

    df.to_parquet(output_path, index=False)
    print(f"Saved preprocessed tabular dataset to {output_path} (shape: {df.shape})")


def main() -> None:
    parser = argparse.ArgumentParser(description="Preprocess raw chess evaluations to tabular features.")
    parser.add_argument("--raw-path", type=str, required=True, help="Input raw jsonl")
    parser.add_argument("--output-path", type=str, required=True, help="Output parquet")
    args = parser.parse_args()

    preprocess_dataset(args.raw_path, args.output_path)


if __name__ == "__main__":
    main()
