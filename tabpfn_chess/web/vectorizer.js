// vectorizer.js - Exact 787-dimensional Tabular Chess Feature Extractor for TabPFN
// Compatible with both browser (window.extractFeatures) and Node.js (module.exports)

const PIECE_SYMBOLS = ["P", "N", "B", "R", "Q", "K", "p", "n", "b", "r", "q", "k"];
const PIECE_VALUES = { p: 1.0, n: 3.0, b: 3.0, r: 5.0, q: 9.0, k: 0.0 };
const CENTER_SQUARES = ["e4", "d4", "e5", "d5"];

const KNIGHT_DELTAS = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1]
];
const KING_DELTAS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];
const BISHOP_DIRS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const ROOK_DIRS   = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function sqNameToCoords(sqName) {
  return {
    file: sqName.charCodeAt(0) - 97, // 0..7 for a..h
    rank: parseInt(sqName[1], 10) - 1 // 0..7 for 1..8
  };
}

function coordsToSqName(file, rank) {
  return String.fromCharCode(97 + file) + (rank + 1);
}

function isOnBoard(file, rank) {
  return file >= 0 && file < 8 && rank >= 0 && rank < 8;
}

function isAttackedBy(chessInstance, sqName, color) {
  const { file: tf, rank: tr } = sqNameToCoords(sqName);

  // 1. Pawn attacks
  const pawnRank = color === "w" ? tr - 1 : tr + 1;
  for (const pf of [tf - 1, tf + 1]) {
    if (isOnBoard(pf, pawnRank)) {
      const p = chessInstance.get(coordsToSqName(pf, pawnRank));
      if (p && p.type === "p" && p.color === color) {
        return true;
      }
    }
  }

  // 2. Knight attacks
  for (const [df, dr] of KNIGHT_DELTAS) {
    const f = tf + df;
    const r = tr + dr;
    if (isOnBoard(f, r)) {
      const p = chessInstance.get(coordsToSqName(f, r));
      if (p && p.type === "n" && p.color === color) {
        return true;
      }
    }
  }

  // 3. King attacks
  for (const [df, dr] of KING_DELTAS) {
    const f = tf + df;
    const r = tr + dr;
    if (isOnBoard(f, r)) {
      const p = chessInstance.get(coordsToSqName(f, r));
      if (p && p.type === "k" && p.color === color) {
        return true;
      }
    }
  }

  // 4. Bishop and Queen diagonals
  for (const [df, dr] of BISHOP_DIRS) {
    let f = tf + df;
    let r = tr + dr;
    while (isOnBoard(f, r)) {
      const p = chessInstance.get(coordsToSqName(f, r));
      if (p) {
        if (p.color === color && (p.type === "b" || p.type === "q")) {
          return true;
        }
        break; // Ray blocked by any piece
      }
      f += df;
      r += dr;
    }
  }

  // 5. Rook and Queen orthogonals
  for (const [df, dr] of ROOK_DIRS) {
    let f = tf + df;
    let r = tr + dr;
    while (isOnBoard(f, r)) {
      const p = chessInstance.get(coordsToSqName(f, r));
      if (p) {
        if (p.color === color && (p.type === "r" || p.type === "q")) {
          return true;
        }
        break; // Ray blocked by any piece
      }
      f += df;
      r += dr;
    }
  }

  return false;
}

function countPassedPawns(chessInstance, color) {
  const pawns = [];
  const oppPawns = [];
  const oppColor = color === "w" ? "b" : "w";

  for (let sq = 0; sq < 64; sq++) {
    const file = sq % 8;
    const rank = Math.floor(sq / 8);
    const piece = chessInstance.get(coordsToSqName(file, rank));
    if (piece && piece.type === "p") {
      if (piece.color === color) {
        pawns.push({ file, rank });
      } else if (piece.color === oppColor) {
        oppPawns.push({ file, rank });
      }
    }
  }

  let count = 0;
  for (const p of pawns) {
    let isPassed = true;
    for (const opp of oppPawns) {
      if (Math.abs(opp.file - p.file) <= 1) {
        if (color === "w" && opp.rank > p.rank) {
          isPassed = false;
          break;
        } else if (color === "b" && opp.rank < p.rank) {
          isPassed = false;
          break;
        }
      }
    }
    if (isPassed) {
      count++;
    }
  }
  return count;
}

function extractFeatures(chessInstance, useExtraFeatures = true) {
  const feats = new Float32Array(787);
  let idx = 0;

  // 1. 768 square-piece occupancy features (sq 0..63: a1=0..h1=7, a8=56..h8=63)
  for (let sq = 0; sq < 64; sq++) {
    const file = sq % 8;
    const rank = Math.floor(sq / 8);
    const sqName = coordsToSqName(file, rank);
    const piece = chessInstance.get(sqName);

    let symbol = null;
    if (piece) {
      symbol = piece.color === "w" ? piece.type.toUpperCase() : piece.type.toLowerCase();
    }

    for (let pIdx = 0; pIdx < PIECE_SYMBOLS.length; pIdx++) {
      if (symbol === PIECE_SYMBOLS[pIdx]) {
        feats[idx] = 1.0;
      }
      idx++;
    }
  }

  // Parse FEN
  const fen = chessInstance.fen();
  const parts = fen.split(" ");
  const activeTurn = parts[1];
  const castling = parts[2];
  const epSquare = parts[3];
  const halfmoveClock = parseInt(parts[4] || "0", 10);
  const fullmoveNumber = parseInt(parts[5] || "1", 10);

  // 2. 5 board state metadata features (768..772)
  feats[idx++] = activeTurn === "w" ? 1.0 : 0.0;
  feats[idx++] = castling.includes("K") ? 1.0 : 0.0;
  feats[idx++] = castling.includes("Q") ? 1.0 : 0.0;
  feats[idx++] = castling.includes("k") ? 1.0 : 0.0;
  feats[idx++] = castling.includes("q") ? 1.0 : 0.0;

  // If extra features disabled, zero out features 773..786 (Raw Position Mode)
  if (!useExtraFeatures) {
    return feats;
  }

  // 3. Additional engineered domain features (773..786)
  let whiteMat = 0.0;
  let blackMat = 0.0;
  let totalPieces = 0;
  let whiteBishops = 0;
  let blackBishops = 0;

  for (let sq = 0; sq < 64; sq++) {
    const file = sq % 8;
    const rank = Math.floor(sq / 8);
    const p = chessInstance.get(coordsToSqName(file, rank));
    if (p) {
      totalPieces++;
      const val = PIECE_VALUES[p.type] || 0.0;
      if (p.color === "w") {
        whiteMat += val;
        if (p.type === "b") whiteBishops++;
      } else {
        blackMat += val;
        if (p.type === "b") blackBishops++;
      }
    }
  }

  // 7 heuristic features
  feats[idx++] = whiteMat - blackMat; // 773: material_delta
  feats[idx++] = chessInstance.in_check() ? 1.0 : 0.0; // 774: is_in_check
  
  // Center control
  let centerWhite = 0.0;
  let centerBlack = 0.0;
  for (const cSq of CENTER_SQUARES) {
    if (isAttackedBy(chessInstance, cSq, "w")) centerWhite += 1.0;
    if (isAttackedBy(chessInstance, cSq, "b")) centerBlack += 1.0;
  }
  feats[idx++] = centerWhite; // 775: center_control_white
  feats[idx++] = centerBlack; // 776: center_control_black

  // Mobility
  feats[idx++] = chessInstance.moves().length; // 777: mobility

  // Bishop pairs
  feats[idx++] = whiteBishops >= 2 ? 1.0 : 0.0; // 778: bishop_pair_white
  feats[idx++] = blackBishops >= 2 ? 1.0 : 0.0; // 779: bishop_pair_black

  // 7 additional basic domain metadata features
  feats[idx++] = halfmoveClock; // 780: halfmove_clock
  feats[idx++] = fullmoveNumber; // 781: fullmove_number
  feats[idx++] = epSquare !== "-" ? 1.0 : 0.0; // 782: has_en_passant
  feats[idx++] = totalPieces; // 783: total_pieces
  feats[idx++] = whiteMat + blackMat; // 784: total_material
  feats[idx++] = countPassedPawns(chessInstance, "w"); // 785: passed_pawns_white
  feats[idx++] = countPassedPawns(chessInstance, "b"); // 786: passed_pawns_black

  if (idx !== 787) {
    throw new Error(`Expected 787 features filled, got ${idx}`);
  }

  return feats;
}

// Compute structured breakdown of additional features for live UI visualization
function computeAdditionalFeatures(chessInstance) {
  let whiteMat = 0.0;
  let blackMat = 0.0;
  let totalPieces = 0;
  let whiteBishops = 0;
  let blackBishops = 0;

  for (let sq = 0; sq < 64; sq++) {
    const file = sq % 8;
    const rank = Math.floor(sq / 8);
    const p = chessInstance.get(coordsToSqName(file, rank));
    if (p) {
      totalPieces++;
      const val = PIECE_VALUES[p.type] || 0.0;
      if (p.color === "w") {
        whiteMat += val;
        if (p.type === "b") whiteBishops++;
      } else {
        blackMat += val;
        if (p.type === "b") blackBishops++;
      }
    }
  }

  let centerWhite = 0;
  let centerBlack = 0;
  const centerAttacks = {};
  for (const cSq of CENTER_SQUARES) {
    const wAtt = isAttackedBy(chessInstance, cSq, "w");
    const bAtt = isAttackedBy(chessInstance, cSq, "b");
    centerAttacks[cSq] = { w: wAtt, b: bAtt };
    if (wAtt) centerWhite++;
    if (bAtt) centerBlack++;
  }

  const passedWhite = countPassedPawns(chessInstance, "w");
  const passedBlack = countPassedPawns(chessInstance, "b");
  const mobility = chessInstance.moves().length;
  const inCheck = chessInstance.in_check();

  return {
    materialDelta: whiteMat - blackMat,
    totalMaterial: whiteMat + blackMat,
    whiteMat,
    blackMat,
    totalPieces,
    centerWhite,
    centerBlack,
    centerAttacks,
    mobility,
    bishopPairWhite: whiteBishops >= 2,
    bishopPairBlack: blackBishops >= 2,
    passedWhite,
    passedBlack,
    inCheck
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    extractFeatures,
    computeAdditionalFeatures,
    isAttackedBy,
    countPassedPawns,
    PIECE_VALUES,
    PIECE_SYMBOLS
  };
}

if (typeof window !== "undefined") {
  window.TabPFNVectorizer = {
    extractFeatures,
    computeAdditionalFeatures,
    isAttackedBy,
    countPassedPawns,
    PIECE_VALUES,
    PIECE_SYMBOLS
  };
}
