// transform_viz.js - Interactive SVG Visualization: Chessboard to Tabular (787-dim) Transformation
// Distill / NeurIPS style architectural diagram and interactive vectorizer explorer

function getAttackers(chessInstance, sqName, color) {
  const attackers = [];
  const tf = sqName.charCodeAt(0) - 97;
  const tr = parseInt(sqName[1], 10) - 1;

  // 1. Pawn attacks
  const pawnRank = color === "w" ? tr - 1 : tr + 1;
  for (const pf of [tf - 1, tf + 1]) {
    if (pf >= 0 && pf < 8 && pawnRank >= 0 && pawnRank < 8) {
      const psq = String.fromCharCode(97 + pf) + (pawnRank + 1);
      const p = chessInstance.get(psq);
      if (p && p.type === "p" && p.color === color) {
        attackers.push(psq);
      }
    }
  }

  // 2. Knight attacks
  const knightDeltas = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];
  for (const [df, dr] of knightDeltas) {
    const f = tf + df;
    const r = tr + dr;
    if (f >= 0 && f < 8 && r >= 0 && r < 8) {
      const ksq = String.fromCharCode(97 + f) + (r + 1);
      const p = chessInstance.get(ksq);
      if (p && p.type === "n" && p.color === color) {
        attackers.push(ksq);
      }
    }
  }

  // 3. King attacks
  const kingDeltas = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  for (const [df, dr] of kingDeltas) {
    const f = tf + df;
    const r = tr + dr;
    if (f >= 0 && f < 8 && r >= 0 && r < 8) {
      const ksq = String.fromCharCode(97 + f) + (r + 1);
      const p = chessInstance.get(ksq);
      if (p && p.type === "k" && p.color === color) {
        attackers.push(ksq);
      }
    }
  }

  // 4. Bishop and Queen diagonals
  const bishopDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  for (const [df, dr] of bishopDirs) {
    let f = tf + df;
    let r = tr + dr;
    while (f >= 0 && f < 8 && r >= 0 && r < 8) {
      const dsq = String.fromCharCode(97 + f) + (r + 1);
      const p = chessInstance.get(dsq);
      if (p) {
        if (p.color === color && (p.type === "b" || p.type === "q")) {
          attackers.push(dsq);
        }
        break;
      }
      f += df;
      r += dr;
    }
  }

  // 5. Rook and Queen orthogonals
  const rookDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [df, dr] of rookDirs) {
    let f = tf + df;
    let r = tr + dr;
    while (f >= 0 && f < 8 && r >= 0 && r < 8) {
      const osq = String.fromCharCode(97 + f) + (r + 1);
      const p = chessInstance.get(osq);
      if (p) {
        if (p.color === color && (p.type === "r" || p.type === "q")) {
          attackers.push(osq);
        }
        break;
      }
      f += df;
      r += dr;
    }
  }

  return attackers;
}

function getTargets(chessInstance, sqName) {
  const p = chessInstance.get(sqName);
  if (!p) return [];
  const oppCol = p.color === 'w' ? 'b' : 'w';
  const targets = [];
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const targetSq = String.fromCharCode(97 + f) + (r + 1);
      const tp = chessInstance.get(targetSq);
      if (tp && tp.color === oppCol) {
        const attackers = getAttackers(chessInstance, targetSq, p.color);
        if (attackers.includes(sqName)) {
          targets.push(targetSq);
        }
      }
    }
  }
  return targets;
}

class ChessboardTabularVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.currentFen = new Chess().fen();
    this.liveFen = this.currentFen;
    this.board = new Chess(this.currentFen);
    this.activeSquare = 'e2';
    this.useExtraFeatures = true;

    this.initDOM();
    this.render();
  }

  setBoardFromFen(fen, presetId = 'btnVizLive') {
    this.cancelDrag();
    const board = new Chess();
    if (!board.load(fen)) throw new Error('Invalid feature explorer FEN');
    this.currentFen = fen;
    this.board = board;
    if (presetId === 'btnVizLive') this.liveFen = fen;
    for (const id of ['btnVizLive', 'btnVizPreset1', 'btnVizPreset2', 'btnVizPreset3']) {
      document.getElementById(id).classList.toggle('active', id === presetId);
    }
    this.render();
  }

  setFeatureMode(enabled) {
    this.useExtraFeatures = enabled;
    this.renderFeatureValues();
  }

  renderFeatureValues() {
    const values = TabPFNVectorizer.extractFeatures(this.board, this.useExtraFeatures);
    const descriptions = [
      '1 = White to move; 0 = Black', 'White retains kingside castling rights', 'White retains queenside castling rights',
      'Black retains kingside castling rights', 'Black retains queenside castling rights',
      'White − Black material, in pawn units', 'Side to move is in check',
      'Central squares attacked by White (0–4)', 'Central squares attacked by Black (0–4)',
      'Legal moves for the side to move', 'White has at least two bishops', 'Black has at least two bishops',
      'Plies since the last pawn move or capture', 'Full move counter, starting at 1',
      'FEN contains an en passant target', 'Pieces on the board, including kings',
      'White + Black material, in pawn units', 'White passed pawns', 'Black passed pawns'
    ];
    const names = [
      'turn_white', 'castling_white_kingside', 'castling_white_queenside',
      'castling_black_kingside', 'castling_black_queenside', 'material_delta',
      'is_in_check', 'center_control_white', 'center_control_black', 'mobility_active',
      'has_bishop_pair_white', 'has_bishop_pair_black', 'halfmove_clock', 'fullmove_number',
      'has_en_passant', 'total_pieces', 'total_material', 'white_passed_pawns', 'black_passed_pawns'
    ];
    for (const [id, start, end] of [['positionFeatureCells', 0, 12], ['globalFeatureCells', 12, 19]]) {
      const cellWidth = 376 / (end - start);
      document.getElementById(id).innerHTML = names.slice(start, end).map((name, offset) => {
        const index = 768 + start + offset;
        const value = values[index];
        const disabled = index >= 773 && !this.useExtraFeatures;
        const fill = disabled ? '#f1f5f9' : value === 0 ? '#e2e8f0' : value < 0 ? '#ffe4e6' : '#d1fae5';
        const label = `x[${index}] ${name} = ${value}${disabled ? ' (masked to 0)' : ''}`;
        return `<g data-vector-feature-index="${index}" role="img" aria-label="${label}">
          <title>${label}</title>
          <rect x="${offset * cellWidth}" y="0" width="${cellWidth - 3}" height="20" rx="2"
            fill="${fill}" stroke="#94a3b8"${disabled ? ' stroke-dasharray="2,2"' : ''} />
          <text x="${offset * cellWidth + (cellWidth - 3) / 2}" y="14" text-anchor="middle"
            fill="#182235" font-family="'JetBrains Mono', monospace" font-size="10">${value}</text>
        </g>`;
      }).join('');
    }
    document.getElementById('featureValues').innerHTML = [
      [0, 5, 'Board flags', '768:773'], [5, 12, 'Position features', '773:780'],
      [12, 19, 'Game state', '780:787']
    ].map(([start, end, title, slice]) => `<section class="feature-value-group">
      <h4>${title} <code>x[${slice}]</code></h4>
      <table><thead><tr><th scope="col">Feature</th><th scope="col">Value</th></tr></thead><tbody>
      ${names.slice(start, end).map((name, offset) => {
        const i = start + offset;
        const disabled = i >= 5 && !this.useExtraFeatures;
        return `<tr class="${disabled ? 'feature-disabled' : ''}"><th scope="row">
          <code><span class="feature-index">${768 + i}</span> ${name}</code><small>${descriptions[i]}${disabled ? ' · masked to 0' : ''}</small>
          </th><td data-feature-index="${768 + i}">${values[768 + i]}</td></tr>`;
      }).join('')}</tbody></table></section>`).join('');
    document.getElementById('featurePositionFen').textContent = this.board.fen();
  }

  initDOM() {
    this.container.innerHTML = `
      <div class="transform-viz-card">
        <div class="transform-viz-header">
          <div class="viz-header-title">
            <h3>Spatial Board &rarr; 787-Dimensional Tabular Vector</h3>
          </div>
          <div class="viz-controls">
            <button class="btn-academic-pill active" id="btnVizLive">Playing board</button>
            <button class="btn-academic-pill" id="btnVizPreset1">Ruy Lopez</button>
            <button class="btn-academic-pill" id="btnVizPreset2">Scandinavian (Qd5 Attacked)</button>
            <button class="btn-academic-pill" id="btnVizPreset3">Fried Liver (f7 &amp; d5 Attacked)</button>
          </div>
        </div>

        <div class="viz-canvas-wrapper" id="vizSvgContainer">
          <svg id="transformSvg" viewBox="0 0 1000 380" width="100%" height="auto" preserveAspectRatio="xMidYMid meet"></svg>
        </div>
        <p class="viz-move-status" id="vizMoveStatus" role="status"></p>

        <div class="transform-inspector-bar" id="transformInspector">
          <div class="inspector-item">
            <span class="inspector-label">INSPECTED SQUARE</span>
            <span class="inspector-val mono" id="inspSquare">b5 (Index 33)</span>
          </div>
          <div class="inspector-item">
            <span class="inspector-label">PIECE &amp; TACTICAL ATTACK STATE</span>
            <span class="inspector-val mono" id="inspChannels">[White B=1 &bull; ATTACKED by a6]</span>
          </div>
          <div class="inspector-item">
            <span class="inspector-label">VECTOR SLICE</span>
            <span class="inspector-val mono" id="inspSlice">x[396:408] &isin; {0, 1}</span>
          </div>
          <div class="inspector-item">
            <span class="inspector-label">TACTICAL TENSION</span>
            <span class="inspector-val mono" id="inspSparsity">3.0 Pts &bull; Under Direct Attack</span>
          </div>
        </div>
        <div class="feature-values-header"><h3>All 19 additional inputs</h3>
          <p>Actual encoded values for the diagram above. Indices are zero-based; slice endpoints are exclusive.
          The vector cells show these values in index order: gray = zero, green = positive, pink = negative;
          dashed cells are masked. Hover a cell for its name. Dragging a piece or choosing a preset updates the values;
          inspecting a square leaves these board-wide inputs unchanged.</p>
          <code id="featurePositionFen"></code>
        </div>
        <div class="feature-values-grid" id="featureValues"></div>
      </div>
    `;

    const svg = document.getElementById('transformSvg');
    svg.addEventListener('pointerdown', event => this.startDrag(event));
    svg.addEventListener('pointermove', event => this.moveDrag(event));
    svg.addEventListener('pointerup', event => this.finishDrag(event));
    svg.addEventListener('pointercancel', () => this.cancelDrag());
    svg.addEventListener('lostpointercapture', () => this.cancelDrag());

    document.getElementById('btnVizLive').addEventListener('click', () => this.setBoardFromFen(this.liveFen));

    document.getElementById('btnVizPreset1').addEventListener('click', (e) => {
      this.setBoardFromFen('r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', e.currentTarget.id);
      this.highlightSquare('b5');
    });

    document.getElementById('btnVizPreset2').addEventListener('click', (e) => {
      this.setBoardFromFen('rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3', e.currentTarget.id);
      this.highlightSquare('d5');
    });

    document.getElementById('btnVizPreset3').addEventListener('click', (e) => {
      this.setBoardFromFen('r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6', e.currentTarget.id);
      this.highlightSquare('f7');
    });

  }

  pointerPosition(event) {
    const svg = document.getElementById('transformSvg');
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse());
  }

  startDrag(event) {
    if (event.button !== 0 || !event.isPrimary || this.drag) return;
    const group = event.target.closest('.board-sq-group');
    if (!group) return;
    const from = group.dataset.sq;
    this.highlightSquare(from);
    const moves = this.board.moves({square: from, verbose: true});
    if (!moves.length) return;
    event.preventDefault();
    const svg = document.getElementById('transformSvg');
    const piece = group.querySelector('svg');
    const ghost = piece.cloneNode(true);
    ghost.classList.add('viz-drag-ghost');
    svg.appendChild(ghost);
    piece.style.opacity = '0.25';
    this.drag = {from, moves, piece, ghost, pointerId: event.pointerId};
    svg.classList.add('viz-dragging');
    for (const move of moves) svg.querySelector(`[data-sq="${move.to}"]`).classList.add('viz-legal-target');
    svg.setPointerCapture(event.pointerId);
    this.moveDrag(event);
  }

  moveDrag(event) {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;
    event.preventDefault();
    const point = this.pointerPosition(event);
    this.drag.ghost.setAttribute('x', point.x - 15.5);
    this.drag.ghost.setAttribute('y', point.y - 15.5);
  }

  cancelDrag() {
    if (!this.drag) return;
    const {piece, ghost, pointerId} = this.drag;
    this.drag = null;
    piece.style.opacity = '';
    ghost.remove();
    const svg = document.getElementById('transformSvg');
    svg.classList.remove('viz-dragging');
    svg.querySelectorAll('.viz-legal-target').forEach(group => group.classList.remove('viz-legal-target'));
    if (svg.hasPointerCapture(pointerId)) svg.releasePointerCapture(pointerId);
  }

  finishDrag(event) {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;
    const {from, moves} = this.drag;
    const point = this.pointerPosition(event);
    const file = Math.floor((point.x - 40) / 35);
    const rank = 7 - Math.floor((point.y - 45) / 35);
    const to = file >= 0 && file < 8 && rank >= 0 && rank < 8
      ? String.fromCharCode(97 + file) + (rank + 1) : null;
    this.cancelDrag();
    if (to === from) return;
    if (!moves.some(move => move.to === to)) {
      document.getElementById('vizMoveStatus').textContent = 'Move cancelled. Drop on a highlighted legal square.';
      return;
    }
    const move = this.board.move({from, to, promotion: 'q'});
    this.currentFen = this.board.fen();
    this.activeSquare = to;
    this.container.querySelectorAll('.viz-controls button').forEach(button => button.classList.remove('active'));
    this.render();
    document.getElementById('vizMoveStatus').textContent = `${move.san} · ${this.board.turn() === 'w' ? 'White' : 'Black'} to move. Drag another piece to explore the encoding.`;
  }

  highlightSquare(sqName) {
    this.activeSquare = sqName;
    this.updateInspector(sqName);
    this.updateSvgHighlights();
  }

  updateInspector(sqName) {
    const file = sqName.charCodeAt(0) - 97;
    const rank = parseInt(sqName[1], 10) - 1;
    const sqIdx = rank * 8 + file;
    const piece = this.board.get(sqName);

    const inspSquare = document.getElementById('inspSquare');
    const inspChannels = document.getElementById('inspChannels');
    const inspSlice = document.getElementById('inspSlice');
    const inspSparsity = document.getElementById('inspSparsity');

    if (inspSquare) {
      if (piece) {
        const pieceNames = { p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King' };
        const colName = piece.color === 'w' ? 'White' : 'Black';
        inspSquare.textContent = `${sqName} (${colName} ${pieceNames[piece.type]})`;
      } else {
        inspSquare.textContent = `${sqName} (Empty Square)`;
      }
    }

    const startIdx = sqIdx * 12;
    const endIdx = startIdx + 12;
    if (inspSlice) {
      inspSlice.textContent = `x[${startIdx}:${endIdx}] (12 binary channels)`;
    }

    if (piece) {
      const oppCol = piece.color === 'w' ? 'b' : 'w';
      const attackers = getAttackers(this.board, sqName, oppCol);
      const defenders = getAttackers(this.board, sqName, piece.color);
      const targets = getTargets(this.board, sqName);
      const pieceVal = { p: 1.0, n: 3.0, b: 3.0, r: 5.0, q: 9.0, k: 0.0 }[piece.type];

      let chText = `[${piece.color === 'w' ? 'White' : 'Black'} ${piece.type.toUpperCase()}=1`;
      if (attackers.length > 0) {
        chText += ` • ATTACKED by ${attackers.join(', ')}`;
      }
      if (targets.length > 0) {
        chText += ` • Attacks ${targets.join(', ')}`;
      }
      chText += `]`;
      if (inspChannels) inspChannels.textContent = chText;

      let tensionText = `${pieceVal.toFixed(1)} Pts • `;
      if (attackers.length > 0) {
        if (defenders.length > 0) {
          tensionText += `Contested (Defended by ${defenders.join(', ')})`;
        } else {
          tensionText += `HANGING / EN PRISE (No defenders!)`;
        }
      } else {
        if (defenders.length > 0) {
          tensionText += `Protected (by ${defenders.join(', ')})`;
        } else {
          tensionText += `Safe / Uncontested`;
        }
      }
      if (inspSparsity) inspSparsity.textContent = tensionText;
    } else {
      if (inspChannels) inspChannels.textContent = `[All 12 channels = 0 • Square Empty]`;
      const isCenter = ['e4', 'd4', 'e5', 'd5'].includes(sqName);
      const wControl = getAttackers(this.board, sqName, 'w');
      const bControl = getAttackers(this.board, sqName, 'b');

      let centerText = '0.0 Pts • ';
      if (isCenter) {
        centerText += `Key Center Square (W:${wControl.length} vs B:${bControl.length} control)`;
      } else if (wControl.length > 0 || bControl.length > 0) {
        centerText += `Controlled (W:${wControl.length}, B:${bControl.length})`;
      } else {
        centerText += `Uncontested Open Square`;
      }
      if (inspSparsity) inspSparsity.textContent = centerText;
    }
  }

  render() {
    const svg = document.getElementById('transformSvg');
    if (!svg) return;

    const boardX = 40;
    const boardY = 45;
    const boardSize = 280;
    const sqSize = boardSize / 8;

    const vectorX = 540;
    const vectorY = 45;
    const vectorWidth = 420;
    const vectorHeight = 280;

    let svgHtml = `
      <defs>
        <linearGradient id="tensorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f1f5f9" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
        <marker id="attackArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
        </marker>
        <marker id="threatArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
        </marker>
      </defs>

      <!-- Section Titles -->
      <text x="${boardX}" y="30" fill="#526078" font-family="'Inter', sans-serif" font-size="11" font-weight="700" letter-spacing="0.08em">
        1. SPATIAL CHESSBOARD S (8 &times; 8)
      </text>
      <text x="${vectorX}" y="30" fill="#526078" font-family="'Inter', sans-serif" font-size="11" font-weight="700" letter-spacing="0.08em">
        2. TABULAR ROW TENSOR x &isin; ℝ⁷⁸⁷
      </text>

      <!-- Board Frame -->
      <rect x="${boardX - 1}" y="${boardY - 1}" width="${boardSize + 2}" height="${boardSize + 2}" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" rx="0" />
    `;

    // 8x8 Board Squares (Matching the playable chessboard theme & piece vectors)
    for (let r = 7; r >= 0; r--) {
      for (let f = 0; f < 8; f++) {
        const sqName = String.fromCharCode(97 + f) + (r + 1);
        const x = boardX + f * sqSize;
        const y = boardY + (7 - r) * sqSize;
        const isDark = (r + f) % 2 === 0;
        const isTarget = sqName === this.activeSquare;

        const fill = isTarget 
          ? 'rgba(225, 29, 72, 0.35)' 
          : (isDark ? '#4b5568' : '#eceef2');

        const stroke = isTarget ? '#e11d48' : 'none';
        const strokeW = isTarget ? '1.5' : '0';

        svgHtml += `
          <g class="board-sq-group" data-sq="${sqName}">
            <rect id="sq-${sqName}" x="${x}" y="${y}" width="${sqSize}" height="${sqSize}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}" />
        `;

        // Rank and file labels on outer edges matching the game board coordinates
        if (f === 0) {
          svgHtml += `<text x="${x + 2}" y="${y + 9}" fill="${isDark ? '#eceef2' : '#4b5568'}" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700">${r + 1}</text>`;
        }
        if (r === 0) {
          svgHtml += `<text x="${x + sqSize - 7}" y="${y + sqSize - 2}" fill="${isDark ? '#eceef2' : '#4b5568'}" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700">${String.fromCharCode(97 + f)}</text>`;
        }

        // Tactical attack overlay
        const piece = this.board.get(sqName);
        let isAttacked = false;
        let isDefended = false;
        if (piece) {
          const oppCol = piece.color === 'w' ? 'b' : 'w';
          const attackers = getAttackers(this.board, sqName, oppCol);
          isAttacked = attackers.length > 0;
          const defenders = getAttackers(this.board, sqName, piece.color);
          isDefended = defenders.length > 0;
        }

        if (isAttacked) {
          svgHtml += `
            <rect class="attack-ring" x="${x + 2}" y="${y + 2}" width="${sqSize - 4}" height="${sqSize - 4}" fill="${isDefended ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.22)'}" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="3,2" rx="2" style="pointer-events: none;" />
            <circle cx="${x + sqSize - 6}" cy="${y + 6}" r="3.5" fill="#ef4444" stroke="#08090d" stroke-width="0.8" style="pointer-events: none;" />
            <text x="${x + sqSize - 6}" y="${y + 7.5}" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="5.5" font-weight="900" text-anchor="middle" style="pointer-events: none;">!</text>
          `;
        }

        // Draw crisp vector piece matching the real game pieces exactly
        if (piece && typeof SVG_PIECES !== 'undefined') {
          const pKey = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
          const rawSvg = SVG_PIECES[pKey];
          if (rawSvg) {
            const pieceSvg = rawSvg.replace(/<svg[^>]*>/, `<svg x="${x + 2}" y="${y + 2}" width="${sqSize - 4}" height="${sqSize - 4}" viewBox="0 0 45 45" style="pointer-events: none;">`);
            svgHtml += pieceSvg;
          }
        }

        svgHtml += `</g>`;
      }
    }

    // Dynamic tactical vectors layer (rendered when inspecting squares)
    svgHtml += `
      <g id="tacticalVectorsLayer" style="pointer-events: none;"></g>
      <!-- Board Tactical Legend -->
      <g id="boardLegend" transform="translate(${boardX}, ${boardY + boardSize + 14})">
        <circle cx="5" cy="5" r="3.5" fill="#ef4444" stroke="#08090d" stroke-width="0.8" />
        <text x="5" y="6.5" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="5" font-weight="900" text-anchor="middle">!</text>
        <text x="14" y="8" fill="#526078" font-family="'JetBrains Mono', monospace" font-size="8.5">Geometric attacks (visual aid)</text>
      </g>
    `;

    // Tabular Tensor Container on the Right
    svgHtml += `
      <!-- Vector Frame -->
      <rect x="${vectorX}" y="${vectorY}" width="${vectorWidth}" height="${vectorHeight}" fill="url(#tensorGrad)" stroke="#cbd5e1" stroke-width="1.5" rx="3" />
      
      <!-- Group 1: 768 Piece Square Features -->
      <g id="groupPieces">
        <rect x="${vectorX + 12}" y="${vectorY + 12}" width="${vectorWidth - 24}" height="135" fill="#ffffff" stroke="#cbd5e1" rx="2" />
        <text x="${vectorX + 20}" y="${vectorY + 28}" fill="#182235" font-family="'Inter', sans-serif" font-size="10" font-weight="700">
          SPATIAL PIECE MATRIX: 64 × 12 BINARY CHANNELS (768 features)
        </text>
        <text x="${vectorX + 20}" y="${vectorY + 42}" fill="#526078" font-family="'JetBrains Mono', monospace" font-size="8.5">
          One-hot channel per square: [P, N, B, R, Q, K, p, n, b, r, q, k]
        </text>
    `;

    // Visual miniature cell grid representing the 64 squares x 12 channels
    const cellStartX = vectorX + 20;
    const cellStartY = vectorY + 52;
    const cellW = (vectorWidth - 44) / 32;
    const cellH = 10;

    for (let i = 0; i < 64; i++) {
      const col = i % 32;
      const row = Math.floor(i / 32);
      const cx = cellStartX + col * cellW;
      const cy = cellStartY + row * 24;

      const sqF = i % 8;
      const sqR = Math.floor(i / 8);
      const sqCode = String.fromCharCode(97 + sqF) + (sqR + 1);
      const isTargetSq = sqCode === this.activeSquare;
      const hasPiece = this.board.get(sqCode) !== null;

      const cellFill = isTargetSq 
        ? '#e11d48' 
        : (hasPiece ? '#2563eb' : '#dce3ed');

      svgHtml += `
        <rect id="cell-${sqCode}" x="${cx}" y="${cy}" width="${cellW - 2}" height="${cellH}" rx="1" fill="${cellFill}" />
      `;
    }

    svgHtml += `
        <text x="${vectorX + 20}" y="${cellStartY + 64}" fill="#526078" font-family="'JetBrains Mono', monospace" font-size="8">
          64 squares &times; 12 channels &rarr; indices x[0] through x[767]
        </text>
      </g>

      <!-- Group 2: Board Flags and Position Features (12 values) -->
      <g id="groupTactical">
        <rect x="${vectorX + 12}" y="${vectorY + 158}" width="${vectorWidth - 24}" height="55" fill="#ffffff" stroke="#cbd5e1" rx="2" />
        <text x="${vectorX + 20}" y="${vectorY + 174}" fill="#182235" font-family="'Inter', sans-serif" font-size="10" font-weight="700">
          BOARD FLAGS + POSITION FEATURES · x[768:780]
        </text>
        <g id="positionFeatureCells" transform="translate(${vectorX + 20}, ${vectorY + 184})"></g>
      </g>

      <!-- Group 3: Global Game State (7 features) -->
      <g id="groupGlobal">
        <rect x="${vectorX + 12}" y="${vectorY + 222}" width="${vectorWidth - 24}" height="46" fill="#ffffff" stroke="#cbd5e1" rx="2" />
        <text x="${vectorX + 20}" y="${vectorY + 238}" fill="#182235" font-family="'Inter', sans-serif" font-size="10" font-weight="700">
          GAME STATE · x[780:787]
        </text>
        <g id="globalFeatureCells" transform="translate(${vectorX + 20}, ${vectorY + 244})"></g>
      </g>

    `;

    svg.innerHTML = svgHtml;

    // Attach click listeners to all board squares
    const sqGroups = svg.querySelectorAll('.board-sq-group');
    sqGroups.forEach(g => {
      g.addEventListener('click', () => {
        this.highlightSquare(g.dataset.sq);
      });
      g.addEventListener('mouseenter', () => {
        if (!this.drag) this.highlightSquare(g.dataset.sq);
      });
      if (this.board.get(g.dataset.sq)?.color === this.board.turn()) g.classList.add('viz-movable');
    });

    this.updateSvgHighlights();
    this.updateInspector(this.activeSquare);
    this.renderFeatureValues();
    document.getElementById('vizMoveStatus').textContent = `${this.board.turn() === 'w' ? 'White' : 'Black'} to move. Drag a piece to a highlighted legal square. Promotions become queens. Playing board restores the game position.`;
  }

  updateSvgHighlights() {
    const svg = document.getElementById('transformSvg');
    if (!svg) return;

    const file = this.activeSquare.charCodeAt(0) - 97;
    const rank = parseInt(this.activeSquare[1], 10) - 1;

    const boardX = 40;
    const boardY = 45;
    const sqSize = 280 / 8;
    const startX = boardX + file * sqSize + sqSize / 2;
    const startY = boardY + (7 - rank) * sqSize + sqSize / 2;

    // Update board square highlights
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const sq = String.fromCharCode(97 + f) + (r + 1);
        const rect = document.getElementById(`sq-${sq}`);
        if (rect) {
          const isDark = (r + f) % 2 === 0;
          if (sq === this.activeSquare) {
            rect.setAttribute('fill', 'rgba(225, 29, 72, 0.35)');
            rect.setAttribute('stroke', '#e11d48');
            rect.setAttribute('stroke-width', '1.5');
          } else {
            rect.setAttribute('fill', isDark ? '#4b5568' : '#eceef2');
            rect.setAttribute('stroke', 'none');
            rect.setAttribute('stroke-width', '0');
          }
        }

        // Update corresponding cell in vector strip
        const cell = document.getElementById(`cell-${sq}`);
        if (cell) {
          const hasPiece = this.board.get(sq) !== null;
          cell.setAttribute('fill', sq === this.activeSquare ? '#e11d48' : (hasPiece ? '#2563eb' : '#dce3ed'));
          cell.setAttribute('height', sq === this.activeSquare ? '14' : '10');
        }
      }
    }

    // Render tactical vectors connecting attackers and targets to the inspected square
    const vectorsLayer = document.getElementById('tacticalVectorsLayer');
    if (vectorsLayer) {
      let vectorsHtml = '';
      const activePiece = this.board.get(this.activeSquare);
      if (activePiece) {
        const oppCol = activePiece.color === 'w' ? 'b' : 'w';
        const attackers = getAttackers(this.board, this.activeSquare, oppCol);
        const defenders = getAttackers(this.board, this.activeSquare, activePiece.color);
        const targets = getTargets(this.board, this.activeSquare);

        // 1. Attackers pointing to activeSquare (red dashed line with arrow)
        attackers.forEach(attSq => {
          const af = attSq.charCodeAt(0) - 97;
          const ar = parseInt(attSq[1], 10) - 1;
          const ax = boardX + af * sqSize + sqSize / 2;
          const ay = boardY + (7 - ar) * sqSize + sqSize / 2;
          vectorsHtml += `<line x1="${ax}" y1="${ay}" x2="${startX}" y2="${startY}" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#attackArrow)" opacity="0.9" />`;
        });

        // 2. Friendly defenders supporting activeSquare (emerald dashed line)
        defenders.forEach(defSq => {
          const df = defSq.charCodeAt(0) - 97;
          const dr = parseInt(defSq[1], 10) - 1;
          const dx = boardX + df * sqSize + sqSize / 2;
          const dy = boardY + (7 - dr) * sqSize + sqSize / 2;
          vectorsHtml += `<line x1="${dx}" y1="${dy}" x2="${startX}" y2="${startY}" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.8" />`;
        });

        // 3. Targets attacked by activeSquare (amber dashed line with arrow)
        targets.forEach(tgtSq => {
          const tf = tgtSq.charCodeAt(0) - 97;
          const tr = parseInt(tgtSq[1], 10) - 1;
          const tx = boardX + tf * sqSize + sqSize / 2;
          const ty = boardY + (7 - tr) * sqSize + sqSize / 2;
          vectorsHtml += `<line x1="${startX}" y1="${startY}" x2="${tx}" y2="${ty}" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3,2" marker-end="url(#threatArrow)" opacity="0.85" />`;
        });
      }
      vectorsLayer.innerHTML = vectorsHtml;
    }
  }
}

if (typeof window !== 'undefined') {
  window.ChessboardTabularVisualizer = ChessboardTabularVisualizer;
}
