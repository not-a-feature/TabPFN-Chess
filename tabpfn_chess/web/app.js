// app.js - Main Application Controller for TabPFN Chess

class ChessApp {
  constructor() {
    this.game = new Chess();
    this.client = new ChessEngineClient();
    this.boardOrientation = 'w'; // 'w' = White at bottom, 'b' = Black at bottom
    this.playerColor = 'w'; // 'w', 'b', or 'both' (analysis/human vs human)
    this.isEngineThinking = false;
    this.autoPlayInterval = null;
    this.dragSourceSquare = null;

    // Move history tracking for navigation
    this.moveHistory = [];
    this.currentPly = 0;
    this.evaluationEpoch = 0;

    // Interactive UI state
    this.selectedSquare = null;
    this.legalMovesFromSelected = [];
    this.lastMove = null; // { from, to }

    // Audio Context for sound effects
    this.audioCtx = null;

    this.initElements();
    this.initEventListeners();
    this.syncSettingsUI();
    this.renderBoard();
    this.updateStatus();
    this.updateFeatureExplanation();

    // Initialize SVG Architecture Visualizer if container present
    if (typeof ChessboardTabularVisualizer !== 'undefined') {
      this.transformViz = new ChessboardTabularVisualizer('transformVizContainer');
      this.transformViz.setBoardFromFen(this.game.fen());
      this.transformViz.setFeatureMode(this.client.config.useExtraFeatures);
    }

    this.evaluateCurrentPosition();
  }

  initElements() {
    this.el = {
      chessboard: document.getElementById('chessboard'),
      evalFill: document.getElementById('evalFill'),
      evalTopText: document.getElementById('evalTopText'),
      evalBottomText: document.getElementById('evalBottomText'),
      evalProbVal: document.getElementById('evalProbVal'),
      evalCpVal: document.getElementById('evalCpVal'),
      engineNameVal: document.getElementById('engineNameVal'),
      keyBanner: document.getElementById('keyBanner'),
      statusDot: document.getElementById('statusDot'),
      statusText: document.getElementById('statusText'),
      btnKeyAction: document.getElementById('btnKeyAction'),
      btnKeyActionText: document.getElementById('btnKeyActionText'),
      candidatesTbody: document.getElementById('candidatesTbody'),
      historyTbody: document.getElementById('historyTbody'),
      btnNewGame: document.getElementById('btnNewGame'),
      btnFlip: document.getElementById('btnFlip'),
      btnUndo: document.getElementById('btnUndo'),
      btnEngineMove: document.getElementById('btnEngineMove'),
      btnAutoPlay: document.getElementById('btnAutoPlay'),
      btnPlay: document.getElementById('btnPlay'),
      btnSettings: document.getElementById('btnSettings'),
      settingsModal: document.getElementById('settingsModal'),
      gameOverModal: document.getElementById('gameOverModal'),
      gameOverMark: document.getElementById('gameOverMark'),
      gameOverTitle: document.getElementById('gameOverTitle'),
      gameOverDetail: document.getElementById('gameOverDetail'),
      btnPlayAgain: document.getElementById('btnPlayAgain'),
      btnReviewGame: document.getElementById('btnReviewGame'),
      modalClose: document.getElementById('modalClose'),
      btnSaveSettings: document.getElementById('btnSaveSettings'),
      btnCancelSettings: document.getElementById('btnCancelSettings'),
      btnTestConnection: document.getElementById('btnTestConnection'),
      connectionFeedback: document.getElementById('connectionFeedback'),
      modelSelect: document.getElementById('modelSelect'),
      contextSizeSelect: document.getElementById('contextSizeSelect'),
      searchHorizonSelect: document.getElementById('searchHorizonSelect'),
      tacticalSafetyToggle: document.getElementById('tacticalSafetyToggle'),
      playerColorSelect: document.getElementById('playerColorSelect'),
      toastContainer: document.getElementById('toastContainer'),
      topPlayerName: document.getElementById('topPlayerName'),
      topPlayerBadge: document.getElementById('topPlayerBadge'),
      topCaptured: document.getElementById('topCaptured'),
      topMaterialDiff: document.getElementById('topMaterialDiff'),
      bottomPlayerName: document.getElementById('bottomPlayerName'),
      bottomPlayerBadge: document.getElementById('bottomPlayerBadge'),
      bottomCaptured: document.getElementById('bottomCaptured'),
      bottomMaterialDiff: document.getElementById('bottomMaterialDiff'),
      tabs: document.querySelectorAll('.swiss-tab-btn'),
      tabContents: document.querySelectorAll('.tab-pane'),

      // Feature mode elements
      btnModeAssisted: document.getElementById('btnModeAssisted'),
      btnModeBoardOnly: document.getElementById('btnModeBoardOnly'),
      engineFeatSub: document.getElementById('engineFeatSub'),
      btnHeaderHeuristics: document.getElementById('btnHeaderHeuristics'),
      btnReturnToBoard: document.getElementById('btnReturnToBoard'),
      featureComputationSection: document.getElementById('featureComputationSection'),
      featureModeArenaSelect: document.getElementById('featureModeArenaSelect'),
      featureModeModalSelect: document.getElementById('featureModeModalSelect'),
      featureModeBanner: document.getElementById('featureModeBanner'),
      featureModeBadge: document.getElementById('featureModeBadge'),
      featureModeDesc: document.getElementById('featureModeDesc'),
      featureBreakdownGrid: document.getElementById('featureBreakdownGrid'),

      // Section 01.B Telemetry elements
      featCardMatDelta: document.getElementById('featCardMatDelta'),
      featCardTotalMat: document.getElementById('featCardTotalMat'),
      featCardTotalPieces: document.getElementById('featCardTotalPieces'),
      featBarWhiteMat: document.getElementById('featBarWhiteMat'),
      featBarBlackMat: document.getElementById('featBarBlackMat'),
      featMatBarWhite: document.getElementById('featMatBarWhite'),
      featMatBarBlack: document.getElementById('featMatBarBlack'),
      featCardCenterWhite: document.getElementById('featCardCenterWhite'),
      featCardCenterBlack: document.getElementById('featCardCenterBlack'),
      featCardWhitePassed: document.getElementById('featCardWhitePassed'),
      featCardBlackPassed: document.getElementById('featCardBlackPassed'),
      featCardEnPassant: document.getElementById('featCardEnPassant'),
      passedStatusText: document.getElementById('passedStatusText'),
      featCardMobility: document.getElementById('featCardMobility'),
      featCardInCheck: document.getElementById('featCardInCheck'),
      featCardWhiteBishopPair: document.getElementById('featCardWhiteBishopPair'),
      featCardBlackBishopPair: document.getElementById('featCardBlackBishopPair'),
      featMobilityPct: document.getElementById('featMobilityPct'),
      featMobilityFill: document.getElementById('featMobilityFill'),
      centerCells: document.querySelectorAll('.center-cell')
    };
  }

  initEventListeners() {
    this.el.btnNewGame.addEventListener('click', () => this.newGame());
    this.el.btnFlip.addEventListener('click', () => this.flipBoard());
    this.el.btnUndo.addEventListener('click', () => this.undoMove());
    this.el.btnEngineMove.addEventListener('click', () => this.triggerEngineMove(true));
    this.el.btnAutoPlay.addEventListener('click', () => this.toggleAutoPlay());

    if (this.el.btnKeyAction) {
      this.el.btnKeyAction.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openSettings();
      });
    }
    if (this.el.keyBanner) {
      this.el.keyBanner.addEventListener('click', () => this.openSettings());
    }

    this.el.btnSettings.addEventListener('click', () => this.openSettings());
    this.el.modalClose.addEventListener('click', () => this.closeSettings());
    this.el.btnCancelSettings.addEventListener('click', () => this.closeSettings());
    this.el.btnSaveSettings.addEventListener('click', () => this.saveSettings());
    this.el.btnTestConnection.addEventListener('click', () => this.testConnection());
    this.el.btnPlayAgain.addEventListener('click', () => this.newGame());
    this.el.btnReviewGame.addEventListener('click', () => {
      this.closeGameOver();
      this.el.chessboard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    this.el.playerColorSelect.addEventListener('change', (e) => {
      this.playerColor = e.target.value;
      if (this.playerColor === 'b' && this.boardOrientation === 'w') {
        this.flipBoard();
      }
      this.updatePlayerLabels();
      this.checkEngineTurn();
    });

    if (this.el.btnModeAssisted) {
      this.el.btnModeAssisted.addEventListener('click', () => {
        this.setFeatureMode(true);
      });
    }

    if (this.el.btnModeBoardOnly) {
      this.el.btnModeBoardOnly.addEventListener('click', () => {
        this.setFeatureMode(false);
      });
    }

    if (this.el.featureModeArenaSelect) {
      this.el.featureModeArenaSelect.addEventListener('change', (e) => {
        this.setFeatureMode(e.target.value === 'extended');
      });
    }

    const scrollToHeuristics = (e) => {
      if (e) e.preventDefault();
      if (this.el.featureComputationSection) {
        this.el.featureComputationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.el.featureComputationSection.classList.add('section-highlight-pulse');
        setTimeout(() => {
          this.el.featureComputationSection.classList.remove('section-highlight-pulse');
        }, 1800);
      }
    };

    if (this.el.btnHeaderHeuristics) {
      this.el.btnHeaderHeuristics.addEventListener('click', scrollToHeuristics);
    }

    const scrollToPlayingBoard = (e) => {
      if (e) e.preventDefault();
      this.el.chessboard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const viewport = document.querySelector('.board-viewport');
      viewport.classList.add('section-highlight-pulse');
      setTimeout(() => viewport.classList.remove('section-highlight-pulse'), 1800);
    };
    this.el.btnPlay.addEventListener('click', scrollToPlayingBoard);
    this.el.btnReturnToBoard.addEventListener('click', scrollToPlayingBoard);

    // Tab switching
    this.el.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        this.el.tabs.forEach(t => t.classList.remove('active'));
        this.el.tabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetPane = document.getElementById(`tab-${target}`);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.navigatePly(-1);
      if (e.key === 'ArrowRight') this.navigatePly(1);
      if (e.key === 'f' || e.key === 'F') this.flipBoard();
      if (e.key === ' ') {
        e.preventDefault();
        this.triggerEngineMove();
      }
    });
  }

  // Audio effects
  playAudio(type = 'move') {
    try {
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioCtx = new AudioCtx();
      }
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'capture') {
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'check') {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.setValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      // Audio not permitted or failed
    }
  }

  toast(message, duration = 3000) {
    const t = document.createElement('div');
    t.className = 'swiss-toast';
    t.innerHTML = `<span>●</span> <span>${message}</span>`;
    this.el.toastContainer.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(100%)';
      t.style.transition = 'all 0.3s ease';
      setTimeout(() => t.remove(), 300);
    }, duration);
  }

  newGame() {
    this.evaluationEpoch++;
    this.game.reset();
    this.closeGameOver();
    this.moveHistory = [];
    this.currentPly = 0;
    this.selectedSquare = null;
    this.legalMovesFromSelected = [];
    this.lastMove = null;
    if (this.autoPlayInterval) this.toggleAutoPlay();
    if (this.transformViz) this.transformViz.setBoardFromFen(this.game.fen());
    this.renderBoard();
    this.renderHistory();
    this.updateStatus();
    this.toast('New game started');

    if (this.playerColor === 'b') {
      this.checkEngineTurn();
    } else {
      this.evaluateCurrentPosition();
    }
  }

  flipBoard() {
    this.boardOrientation = this.boardOrientation === 'w' ? 'b' : 'w';
    this.updatePlayerLabels();
    this.renderBoard();
  }

  updatePlayerLabels() {
    const isFlipped = this.boardOrientation === 'b';
    if (!isFlipped) {
      this.el.topPlayerName.textContent = this.playerColor === 'w' ? 'TabPFN Engine' : 'Player';
      this.el.topPlayerBadge.textContent = 'Black';
      this.el.bottomPlayerName.textContent = this.playerColor === 'w' ? 'Player' : 'TabPFN Engine';
      this.el.bottomPlayerBadge.textContent = 'White';
    } else {
      this.el.topPlayerName.textContent = this.playerColor === 'w' ? 'Player' : 'TabPFN Engine';
      this.el.topPlayerBadge.textContent = 'White';
      this.el.bottomPlayerName.textContent = this.playerColor === 'w' ? 'TabPFN Engine' : 'Player';
      this.el.bottomPlayerBadge.textContent = 'Black';
    }
  }

  renderBoard() {
    this.el.chessboard.innerHTML = '';
    const isFlipped = this.boardOrientation === 'b';

    const rankIndices = isFlipped ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    const fileIndices = isFlipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

    const inCheckColor = this.game.in_check() ? this.game.turn() : null;

    for (const r of rankIndices) {
      for (const f of fileIndices) {
        const sqName = String.fromCharCode(97 + f) + (r + 1);
        const sqEl = document.createElement('div');
        const isDark = (r + f) % 2 === 0;

        sqEl.className = `square ${isDark ? 'dark' : 'light'}`;
        sqEl.dataset.square = sqName;

        // Coordinates
        if ((!isFlipped && f === 0) || (isFlipped && f === 7)) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'coord-rank';
          rankLabel.textContent = r + 1;
          sqEl.appendChild(rankLabel);
        }
        if ((!isFlipped && r === 0) || (isFlipped && r === 7)) {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'coord-file';
          fileLabel.textContent = String.fromCharCode(97 + f);
          sqEl.appendChild(fileLabel);
        }

        // Selection & Last Move Highlight
        if (this.selectedSquare === sqName) {
          sqEl.classList.add('selected');
        }
        if (this.lastMove && (this.lastMove.from === sqName || this.lastMove.to === sqName)) {
          sqEl.classList.add('last-move');
        }

        // Piece
        const piece = this.game.get(sqName);
        if (piece) {
          const symbol = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
          const svgContent = SVG_PIECES[symbol];
          if (svgContent) {
            const pieceWrap = document.createElement('div');
            pieceWrap.className = 'piece-svg';
            pieceWrap.innerHTML = svgContent;

            const isMovable = !this.isEngineThinking &&
              piece.color === this.game.turn() &&
              (this.playerColor === 'both' || piece.color === this.playerColor);

            if (isMovable) {
              pieceWrap.classList.add('draggable');
              pieceWrap.setAttribute('draggable', 'true');

              pieceWrap.addEventListener('dragstart', (e) => {
                if (this.isEngineThinking) {
                  e.preventDefault();
                  return;
                }
                this.dragSourceSquare = sqName;
                this.selectedSquare = sqName;
                this.legalMovesFromSelected = this.game.moves({ square: sqName, verbose: true });
                e.dataTransfer.setData('text/plain', sqName);
                e.dataTransfer.effectAllowed = 'move';
                setTimeout(() => {
                  sqEl.classList.add('dragging');
                  this.highlightValidMoveSquares();
                }, 0);
              });

              pieceWrap.addEventListener('dragend', () => {
                this.dragSourceSquare = null;
                document.querySelectorAll('.square').forEach(s => {
                  s.classList.remove('drag-over', 'dragging');
                });
              });
            }

            sqEl.appendChild(pieceWrap);

            // Check highlight on King
            if (piece.type === 'k' && piece.color === inCheckColor) {
              sqEl.classList.add('check');
            }
          }
        }

        // Legal move indicators
        const validMove = this.legalMovesFromSelected.find(m => m.to === sqName);
        if (validMove) {
          if (piece) {
            sqEl.classList.add('valid-capture');
          } else {
            sqEl.classList.add('valid-empty');
          }
        }

        // Drag-and-drop target handlers
        sqEl.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (this.dragSourceSquare && this.dragSourceSquare !== sqName) {
            sqEl.classList.add('drag-over');
          }
        });

        sqEl.addEventListener('dragleave', () => {
          sqEl.classList.remove('drag-over');
        });

        sqEl.addEventListener('drop', (e) => {
          e.preventDefault();
          sqEl.classList.remove('drag-over');
          const fromSq = this.dragSourceSquare || e.dataTransfer.getData('text/plain');
          const toSq = sqName;

          if (fromSq && fromSq !== toSq) {
            const validMoves = this.game.moves({ square: fromSq, verbose: true });
            const matchedMove = validMoves.find(m => m.to === toSq);
            if (matchedMove) {
              this.makeMove(matchedMove);
              this.selectedSquare = null;
              this.legalMovesFromSelected = [];
              this.renderBoard();
            }
          }
        });

        // Click interaction
        sqEl.addEventListener('click', () => this.handleSquareClick(sqName));

        this.el.chessboard.appendChild(sqEl);
      }
    }

    this.updateCapturedAndMaterial();
    this.updateFeatureExplanation();
  }

  highlightValidMoveSquares() {
    this.legalMovesFromSelected.forEach(m => {
      const targetSq = document.querySelector(`.square[data-square="${m.to}"]`);
      if (targetSq) {
        const p = this.game.get(m.to);
        targetSq.classList.add(p ? 'valid-capture' : 'valid-empty');
      }
    });
  }

  handleSquareClick(sqName) {
    if (this.isEngineThinking) return;

    // Check if player clicked a valid destination square
    const moveObj = this.legalMovesFromSelected.find(m => m.to === sqName);
    if (moveObj) {
      this.makeMove(moveObj);
      this.selectedSquare = null;
      this.legalMovesFromSelected = [];
      this.renderBoard();
      return;
    }

    // Otherwise, select piece if it belongs to active turn
    const piece = this.game.get(sqName);
    if (piece && piece.color === this.game.turn()) {
      // Check if human is permitted to play this side
      if (this.playerColor !== 'both' && piece.color !== this.playerColor) {
        return;
      }
      this.selectedSquare = sqName;
      this.legalMovesFromSelected = this.game.moves({ square: sqName, verbose: true });
    } else {
      this.selectedSquare = null;
      this.legalMovesFromSelected = [];
    }

    this.renderBoard();
  }

  makeMove(moveParam) {
    let moveObj = null;
    if (typeof moveParam === 'string') {
      moveObj = this.game.move(moveParam);
    } else if (moveParam && typeof moveParam === 'object') {
      const promotion = moveParam.promotion || (moveParam.flags && moveParam.flags.includes('p') ? 'q' : undefined);
      if (moveParam.from && moveParam.to) {
        moveObj = this.game.move({
          from: moveParam.from,
          to: moveParam.to,
          promotion: promotion
        });
      }
      if (!moveObj && moveParam.san) {
        moveObj = this.game.move(moveParam.san);
      }
      if (!moveObj) {
        moveObj = this.game.move(moveParam);
      }
    }

    if (!moveObj) {
      console.warn('makeMove rejected invalid move:', moveParam, 'Current FEN:', this.game.fen());
      this.renderBoard();
      return false;
    }

    this.lastMove = { from: moveObj.from, to: moveObj.to };
    this.moveHistory.push(moveObj);
    this.currentPly = this.moveHistory.length;

    // Invalidate in-flight background evaluations
    this.evaluationEpoch++;

    // Update SVG architecture visualizer if present
    if (this.transformViz) {
      this.transformViz.setBoardFromFen(this.game.fen());
    }

    // Sound effect
    if (this.game.in_check()) {
      this.playAudio('check');
    } else if (moveObj.captured) {
      this.playAudio('capture');
    } else {
      this.playAudio('move');
    }

    this.renderBoard();
    this.renderHistory();
    this.updateStatus();

    if (this.game.game_over()) {
      this.showGameOver();
      return true;
    }

    // Determine whose turn is next
    const currentTurn = this.game.turn();
    const isHumanNext = this.playerColor === 'both' || currentTurn === this.playerColor;

    if (isHumanNext) {
      this.evaluateCurrentPosition();
    } else {
      setTimeout(() => this.checkEngineTurn(), 100);
    }

    return true;
  }

  undoMove() {
    if (this.isEngineThinking) return;
    if (this.moveHistory.length === 0) return;

    this.evaluationEpoch++;
    this.closeGameOver();

    // In single player, undo both engine and human move
    if (this.playerColor !== 'both') {
      this.game.undo();
      this.moveHistory.pop();
      if (this.game.turn() !== this.playerColor && this.moveHistory.length > 0) {
        this.game.undo();
        this.moveHistory.pop();
      }
    } else {
      this.game.undo();
      this.moveHistory.pop();
    }

    this.currentPly = this.moveHistory.length;
    this.selectedSquare = null;
    this.legalMovesFromSelected = [];
    this.lastMove = this.moveHistory.length > 0 ? {
      from: this.moveHistory[this.moveHistory.length - 1].from,
      to: this.moveHistory[this.moveHistory.length - 1].to
    } : null;

    if (this.transformViz) {
      this.transformViz.setBoardFromFen(this.game.fen());
    }

    this.renderBoard();
    this.renderHistory();
    this.updateStatus();
    this.evaluateCurrentPosition();
  }

  navigatePly(delta) {
    if (delta < 0) {
      this.undoMove();
    }
  }

  checkEngineTurn() {
    if (this.game.game_over()) return;
    if (this.playerColor === 'both') return;

    const currentTurn = this.game.turn();
    if (currentTurn !== this.playerColor) {
      this.triggerEngineMove();
    }
  }

  async triggerEngineMove(forced = false) {
    if (this.isEngineThinking) return;
    if (this.game.game_over()) return;


    this.isEngineThinking = true;
    this.setEngineThinkingUI(true);
    const startFen = this.game.fen();
    const startEpoch = this.evaluationEpoch;

    try {
      const res = await this.client.rankMoves(this.game);

      // Guard against board state mutation during asynchronous search
      if (this.game.fen() !== startFen || this.evaluationEpoch !== startEpoch) {
        console.warn('Engine move aborted: board position changed during search');
        return;
      }

      if (res.error) {
        this.toast(`Engine Error: ${res.error}`, 5000);
        this.renderCandidates([], res.engineUsed, res.error);
        return;
      }

      if (res.moves && res.moves.length > 0) {
        const bestMove = res.moves[0];
        this.renderCandidates(res.moves, res.engineUsed);
        // Clear engine thinking UI before making move so move and triggers process cleanly
        this.isEngineThinking = false;
        this.setEngineThinkingUI(false);
        this.makeMove(bestMove.move);
        return;
      }
    } catch (err) {
      this.toast(`Engine Error: ${err.message}`, 5000);
    } finally {
      this.isEngineThinking = false;
      this.setEngineThinkingUI(false);
      if (this.evaluationEpoch !== startEpoch) this.checkEngineTurn();
    }
  }

  toggleAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      this.el.btnAutoPlay.textContent = 'Auto Play';
      this.el.btnAutoPlay.classList.remove('primary');
      this.toast('Auto play paused');
    } else {
      this.el.btnAutoPlay.textContent = 'Pause Auto Play';
      this.el.btnAutoPlay.classList.add('primary');
      this.toast('Auto play activated: TabPFN Self-Play');
      this.autoPlayInterval = setInterval(() => {
        if (this.game.game_over()) {
          this.toggleAutoPlay();
          return;
        }
        if (!this.isEngineThinking) {
          this.triggerEngineMove(true);
        }
      }, 1400);
    }
  }

  async evaluateCurrentPosition() {
    if (this.game.game_over()) return;


    const currentEpoch = ++this.evaluationEpoch;
    const capturedFen = this.game.fen();

    try {
      const onStatus = (msg) => {
        if (this.evaluationEpoch !== currentEpoch) return;
        this.el.candidatesTbody.innerHTML = `<tr><td colspan="5" class="empty-state">${msg}</td></tr>`;
      };
      onStatus('Evaluating candidate moves in Python...');

      const res = await this.client.rankMoves(this.game, onStatus);

      // If a move was made or position changed during prediction, discard stale result
      if (this.evaluationEpoch !== currentEpoch || this.game.fen() !== capturedFen) {
        return;
      }

      if (res.error) {
        this.renderCandidates([], res.engineUsed, res.error);
        return;
      }

      this.renderCandidates(res.moves, res.engineUsed);

      if (res.moves && res.moves.length > 0) {
        const topMove = res.moves[0];
        const whiteWinProb = topMove.whiteWinProb;
        this.updateEvalBar(whiteWinProb);
      }
    } catch (e) {
      if (this.evaluationEpoch !== currentEpoch) return;
      console.warn('Evaluation failed:', e);
      this.renderCandidates([], 'Python engine Error', e.message);
    }
  }

  updateEvalBar(whiteWinProb) {
    const whitePct = Math.round(whiteWinProb * 100);
    const blackPct = 100 - whitePct;

    this.el.evalFill.style.height = `${whitePct}%`;
    this.el.evalTopText.textContent = `${blackPct}%`;
    this.el.evalBottomText.textContent = `${whitePct}%`;

    this.el.evalProbVal.textContent = `${(whiteWinProb * 100).toFixed(1)}%`;

    // Centipawn equivalent via logistic relation
    if (whiteWinProb > 0.001 && whiteWinProb < 0.999) {
      const cp = -400.0 * Math.log10((1.0 / whiteWinProb) - 1.0);
      const sign = cp > 0 ? '+' : '';
      this.el.evalCpVal.textContent = `${sign}${(cp / 100.0).toFixed(2)}`;
    } else {
      this.el.evalCpVal.textContent = whiteWinProb >= 0.999 ? '+10.0' : '-10.0';
    }
  }

  renderCandidates(moves, engineUsed, error = null) {
    this.el.engineNameVal.textContent = engineUsed;
    this.el.candidatesTbody.innerHTML = '';

    if (error) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td colspan="5" style="padding: 1.5rem 1rem; text-align: center;">
          <div style="color: var(--swiss-red); font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">
            PYTHON ENGINE ERROR
          </div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.75rem; max-width: 440px; margin-left: auto; margin-right: auto;">
            <span class="engine-error-detail"></span>
          </div>
          <button class="btn-swiss btn-sm" id="btnErrSettings" style="font-size: 0.65rem; padding: 0.35rem 0.75rem;">
            CHECK ENGINE SETTINGS
          </button>
        </td>
      `;
      tr.querySelector('.engine-error-detail').textContent = error;
      this.el.candidatesTbody.appendChild(tr);
      const btn = tr.querySelector('#btnErrSettings');
      if (btn) btn.addEventListener('click', () => this.openSettings());
      return;
    }


    if (!moves || moves.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="5" class="empty-state">No legal candidate moves found.</td>`;
      this.el.candidatesTbody.appendChild(tr);
      return;
    }

    const top5 = moves.slice(0, 5);
    top5.forEach((m, idx) => {
      const tr = document.createElement('tr');
      if (idx === 0) tr.classList.add('top-candidate');

      const rankBadge = idx === 0 ? '<span class="badge-rank gold">1</span>' : `<span class="badge-rank">${idx + 1}</span>`;
      const winPct = (m.whiteWinProb * 100).toFixed(1);

      let safetyBadge = '<span class="tactical-tag safe">No loss found</span>';
      if (m.safetyDelta < -0.3) {
        safetyBadge = '<span class="tactical-tag danger">Blunder Risk</span>';
      } else if (m.safetyDelta < 0) {
        safetyBadge = '<span class="tactical-tag danger">Inaccuracy</span>';
      }

      const pvText = m.pv ? m.pv.join(' ') : m.san;

      tr.innerHTML = `
        <td>${rankBadge}</td>
        <td class="move-san">${m.san}</td>
        <td>
          <div class="score-bar-inline">
            <span>${winPct}%</span>
            <div class="score-progress"><div class="score-progress-fill" style="width: ${winPct}%"></div></div>
          </div>
        </td>
        <td>${safetyBadge}</td>
        <td style="font-family: monospace; color: var(--text-muted);">${pvText}</td>
      `;

      tr.addEventListener('click', () => {
        if (!this.isEngineThinking) {
          this.makeMove(m.move);
        }
      });

      this.el.candidatesTbody.appendChild(tr);
    });
  }

  renderHistory() {
    this.el.historyTbody.innerHTML = '';
    const moves = this.moveHistory;

    for (let i = 0; i < moves.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const whiteMove = moves[i];
      const blackMove = moves[i + 1];

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="move-num">${moveNum}.</td>
        <td class="move-ply ${this.currentPly === i + 1 ? 'active-ply' : ''}">${whiteMove ? whiteMove.san : ''}</td>
        <td class="move-ply ${this.currentPly === i + 2 ? 'active-ply' : ''}">${blackMove ? blackMove.san : ''}</td>
      `;
      this.el.historyTbody.appendChild(tr);
    }

    const container = document.querySelector('.history-scroll-box');
    if (container) container.scrollTop = container.scrollHeight;
  }

  updateCapturedAndMaterial() {
    const counts = { p: 0, n: 0, b: 0, r: 0, q: 0 };
    const startingCounts = { p: 8, n: 2, b: 2, r: 2, q: 1 };

    const currentWhite = { ...startingCounts };
    const currentBlack = { ...startingCounts };

    for (let sq = 0; sq < 64; sq++) {
      const file = sq % 8;
      const rank = Math.floor(sq / 8);
      const sqName = String.fromCharCode(97 + file) + (rank + 1);
      const p = this.game.get(sqName);
      if (p && p.type !== 'k') {
        if (p.color === 'w') currentWhite[p.type]--;
        else currentBlack[p.type]--;
      }
    }

    let whiteMatAdv = 0;
    let blackMatAdv = 0;
    const PIECE_VALS = { p: 1, n: 3, b: 3, r: 5, q: 9 };

    let capturedByWhiteHtml = '';
    for (const [type, count] of Object.entries(currentBlack)) {
      if (count > 0) {
        whiteMatAdv += PIECE_VALS[type] * count;
        for (let i = 0; i < count; i++) {
          capturedByWhiteHtml += SVG_PIECES[type.toLowerCase()];
        }
      }
    }

    let capturedByBlackHtml = '';
    for (const [type, count] of Object.entries(currentWhite)) {
      if (count > 0) {
        blackMatAdv += PIECE_VALS[type] * count;
        for (let i = 0; i < count; i++) {
          capturedByBlackHtml += SVG_PIECES[type.toUpperCase()];
        }
      }
    }

    const isFlipped = this.boardOrientation === 'b';
    if (!isFlipped) {
      this.el.bottomCaptured.innerHTML = capturedByWhiteHtml;
      this.el.topCaptured.innerHTML = capturedByBlackHtml;
      const net = whiteMatAdv - blackMatAdv;
      this.el.bottomMaterialDiff.textContent = net > 0 ? `+${net}` : '';
      this.el.topMaterialDiff.textContent = net < 0 ? `+${Math.abs(net)}` : '';
    } else {
      this.el.topCaptured.innerHTML = capturedByWhiteHtml;
      this.el.bottomCaptured.innerHTML = capturedByBlackHtml;
      const net = blackMatAdv - whiteMatAdv;
      this.el.topMaterialDiff.textContent = net < 0 ? `+${Math.abs(net)}` : '';
      this.el.bottomMaterialDiff.textContent = net > 0 ? `+${net}` : '';
    }
  }

  updateStatus() {
    if (this.el.statusDot) this.el.statusDot.className = 'status-dot';
    if (this.el.statusText) this.el.statusText.textContent = 'Python engine · local API';
    if (this.el.btnKeyActionText) this.el.btnKeyActionText.textContent = 'Engine settings';
  }

  showGameOver() {
    if (!this.game.game_over()) return;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      this.el.btnAutoPlay.textContent = 'Auto Play';
      this.el.btnAutoPlay.classList.remove('primary');
    }

    let outcome = 'draw';
    let title = 'Draw';
    let detail;
    if (this.game.in_checkmate()) {
      const winner = this.game.turn() === 'w' ? 'b' : 'w';
      outcome = winner === this.playerColor ? 'won' : 'lost';
      if (this.playerColor === 'both') {
        title = `${winner === 'w' ? 'White' : 'Black'} Won`;
        outcome = 'won';
      } else {
        title = outcome === 'won' ? 'You Won' : 'You Lost';
      }
      detail = `${winner === 'w' ? 'White' : 'Black'} wins by checkmate.`;
    } else if (this.game.in_stalemate()) {
      detail = 'Draw by stalemate.';
    } else if (this.game.insufficient_material()) {
      detail = 'Draw by insufficient material.';
    } else if (this.game.in_threefold_repetition()) {
      detail = 'Draw by threefold repetition.';
    } else {
      detail = 'Draw by the fifty-move rule.';
    }

    this.el.gameOverModal.dataset.outcome = outcome;
    this.el.gameOverMark.textContent = outcome === 'won' ? '♔' : outcome === 'lost' ? '♚' : '½';
    this.el.gameOverTitle.textContent = title;
    this.el.gameOverDetail.textContent = detail;
    this.el.gameOverModal.classList.add('open');
    this.el.btnPlayAgain.focus();
  }

  closeGameOver() {
    this.el.gameOverModal.classList.remove('open');
  }

  setEngineThinkingUI(isThinking) {
    if (isThinking) {
      this.el.btnEngineMove.textContent = 'THINKING...';
      this.el.btnEngineMove.disabled = true;
    } else {
      this.el.btnEngineMove.textContent = 'RUN ENGINE MOVE';
      this.el.btnEngineMove.disabled = false;
    }
  }

  // Settings Management
  openSettings() {
    this.syncSettingsUI();
    if (this.el.connectionFeedback) {
      this.el.connectionFeedback.className = 'connection-pill';
      this.el.connectionFeedback.style.display = 'none';
      this.el.connectionFeedback.textContent = '';
    }
    this.el.settingsModal.classList.add('open');
  }

  closeSettings() {
    this.el.settingsModal.classList.remove('open');
  }

  syncSettingsUI() {
    const cfg = this.client.config;
    this.el.modelSelect.value = cfg.model || '3.5';
    this.el.contextSizeSelect.value = cfg.contextSize || '1000';
    this.el.searchHorizonSelect.value = cfg.searchHorizon || '2';
    this.el.tacticalSafetyToggle.checked = cfg.useTacticalSafety !== false;
    const mode = cfg.useExtraFeatures !== false ? 'extended' : 'raw';
    if (this.el.featureModeModalSelect) this.el.featureModeModalSelect.value = mode;
    if (this.el.featureModeArenaSelect) this.el.featureModeArenaSelect.value = mode;
  }

  saveSettings() {
    this.evaluationEpoch++;
    const useExtra = this.el.featureModeModalSelect ? this.el.featureModeModalSelect.value === 'extended' : true;
    const newConfig = {
      model: this.el.modelSelect.value,
      contextSize: parseInt(this.el.contextSizeSelect.value, 10) || 1000,
      searchHorizon: parseInt(this.el.searchHorizonSelect.value, 10) || 2,
      useTacticalSafety: this.el.tacticalSafetyToggle.checked,
      useExtraFeatures: useExtra
    };

    this.client.saveConfig(newConfig);
    this.updateStatus();
    this.updateFeatureExplanation();
    if (this.el.featureModeArenaSelect) this.el.featureModeArenaSelect.value = useExtra ? 'extended' : 'raw';
    this.closeSettings();
    this.toast('Settings successfully saved');
    this.evaluateCurrentPosition();
  }

  setFeatureMode(useExtra) {
    this.evaluationEpoch++;
    this.client.saveConfig({ useExtraFeatures: useExtra });
    const modeVal = useExtra ? 'extended' : 'raw';
    if (this.el.featureModeArenaSelect) this.el.featureModeArenaSelect.value = modeVal;
    if (this.el.featureModeModalSelect) this.el.featureModeModalSelect.value = modeVal;

    if (this.el.btnModeAssisted && this.el.btnModeBoardOnly) {
      if (useExtra) {
        this.el.btnModeAssisted.classList.add('active');
        this.el.btnModeAssisted.classList.remove('raw-active');
        this.el.btnModeBoardOnly.classList.remove('active', 'raw-active');
      } else {
        this.el.btnModeAssisted.classList.remove('active', 'raw-active');
        this.el.btnModeBoardOnly.classList.add('active', 'raw-active');
      }
    }

    if (this.el.engineFeatSub) {
      this.el.engineFeatSub.textContent = useExtra 
        ? '787 TABULAR FEATURES (ASSISTED)' 
        : '773 ACTIVE FEATURES (PIECES + BOARD FLAGS)';
    }

    this.updateFeatureExplanation();
    this.toast(useExtra 
      ? 'Extended Features Active (787-D: Spatial + Domain Heuristics)' 
      : 'Raw Position Mode Active (773 Active Features: Pieces + Board Flags)');
    this.evaluateCurrentPosition();
  }

  updateFeatureExplanation() {
    if (this.transformViz) this.transformViz.setFeatureMode(this.client.config.useExtraFeatures);
    if (typeof TabPFNVectorizer === 'undefined' || !TabPFNVectorizer.computeAdditionalFeatures) return;
    const stats = TabPFNVectorizer.computeAdditionalFeatures(this.game);
    const useExtra = this.client.config.useExtraFeatures !== false;

    // 1. Update Mode Banner & Styling
    if (this.el.btnModeAssisted && this.el.btnModeBoardOnly) {
      if (useExtra) {
        this.el.btnModeAssisted.classList.add('active');
        this.el.btnModeAssisted.classList.remove('raw-active');
        this.el.btnModeBoardOnly.classList.remove('active', 'raw-active');
      } else {
        this.el.btnModeAssisted.classList.remove('active', 'raw-active');
        this.el.btnModeBoardOnly.classList.add('active', 'raw-active');
      }
    }

    if (this.el.engineFeatSub) {
      this.el.engineFeatSub.textContent = useExtra 
        ? '787 TABULAR FEATURES (ASSISTED)' 
        : '773 ACTIVE FEATURES (PIECES + BOARD FLAGS)';
    }

    if (this.el.featureBreakdownGrid) {
      if (!useExtra) {
        this.el.featureBreakdownGrid.classList.add('raw-mode-active');
      } else {
        this.el.featureBreakdownGrid.classList.remove('raw-mode-active');
      }
    }

    if (this.el.featureModeBadge) {
      this.el.featureModeBadge.className = useExtra ? 'mode-badge active' : 'mode-badge raw-active';
      this.el.featureModeBadge.textContent = useExtra 
        ? 'EXTENDED FEATURES ACTIVE (787-D)' 
        : 'RAW POSITION MODE ACTIVE (773 FEATURES)';
    }

    if (this.el.featureModeDesc) {
      this.el.featureModeDesc.textContent = useExtra
        ? 'TabPFN evaluates all 768 piece-square channels, 5 board flags, and 14 engineered channels (material, center control, passed pawns, mobility).'
        : 'Raw position mode: features 773–786 are clamped to 0.0. TabPFN evaluates candidate moves on 768 occupancy channels and 5 board flags.';
    }

    if (this.el.featureModeArenaSelect) {
      this.el.featureModeArenaSelect.value = useExtra ? 'extended' : 'raw';
    }

    // 2. Card 1: Material Differential & Total Tally
    const deltaSign = stats.materialDelta > 0 ? '+' : '';
    if (this.el.featCardMatDelta) this.el.featCardMatDelta.textContent = `${deltaSign}${stats.materialDelta.toFixed(2)}`;
    if (this.el.featCardTotalMat) this.el.featCardTotalMat.textContent = stats.totalMaterial.toFixed(1);
    if (this.el.featCardTotalPieces) this.el.featCardTotalPieces.textContent = `${stats.totalPieces} / 32`;
    if (this.el.featBarWhiteMat) this.el.featBarWhiteMat.textContent = stats.whiteMat.toFixed(1);
    if (this.el.featBarBlackMat) this.el.featBarBlackMat.textContent = stats.blackMat.toFixed(1);

    if (this.el.featMatBarWhite && this.el.featMatBarBlack) {
      const totMat = stats.whiteMat + stats.blackMat;
      const whitePct = totMat > 0 ? Math.round((stats.whiteMat / totMat) * 100) : 50;
      this.el.featMatBarWhite.style.width = `${whitePct}%`;
      this.el.featMatBarBlack.style.width = `${100 - whitePct}%`;
    }

    // 3. Card 2: Central Space Control (d4, e4, d5, e5)
    if (this.el.featCardCenterWhite) this.el.featCardCenterWhite.textContent = `${stats.centerWhite} / 4 squares`;
    if (this.el.featCardCenterBlack) this.el.featCardCenterBlack.textContent = `${stats.centerBlack} / 4 squares`;

    if (this.el.centerCells) {
      this.el.centerCells.forEach(cell => {
        const sq = cell.dataset.sq;
        const att = stats.centerAttacks[sq] || { w: false, b: false };
        const sqColorClass = (sq === 'd5' || sq === 'e4') ? 'sq-light' : 'sq-dark';
        cell.className = `center-cell ${sqColorClass}`;

        // Unified piece rendering matching game board
        const piece = this.game.get(sq);
        const pieceEl = cell.querySelector('.csq-piece');
        if (pieceEl) {
          if (piece && typeof SVG_PIECES !== 'undefined') {
            const sym = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
            pieceEl.innerHTML = SVG_PIECES[sym] || '';
          } else {
            pieceEl.innerHTML = '';
          }
        }

        const dotsEl = cell.querySelector('.csq-dots');
        let dotsHtml = '';

        if (att.w && att.b) {
          cell.classList.add('att-both');
          dotsHtml = '<span style="color:#ffffff;">●</span><span style="color:#3b82f6;">●</span>';
        } else if (att.w) {
          cell.classList.add('att-w');
          dotsHtml = '<span style="color:#ffffff;">●</span>';
        } else if (att.b) {
          cell.classList.add('att-b');
          dotsHtml = '<span style="color:#3b82f6;">●</span>';
        } else {
          dotsHtml = '<span style="color:#475569;">○</span>';
        }
        if (dotsEl) dotsEl.innerHTML = dotsHtml;
      });
    }

    // 4. Card 3: Passed Pawns
    if (this.el.featCardWhitePassed) this.el.featCardWhitePassed.textContent = stats.passedWhite;
    if (this.el.featCardBlackPassed) this.el.featCardBlackPassed.textContent = stats.passedBlack;

    // En passant square indicator
    const epSquare = this.game.fen().split(' ')[3];
    if (this.el.featCardEnPassant) {
      this.el.featCardEnPassant.textContent = (epSquare && epSquare !== '-') ? epSquare.toUpperCase() : 'None';
    }

    if (this.el.passedStatusText) {
      if (stats.passedWhite === 0 && stats.passedBlack === 0) {
        this.el.passedStatusText.textContent = 'Neither side has a passed pawn.';
      } else {
        const who = stats.passedWhite > 0 && stats.passedBlack > 0 
          ? `Both sides (W: ${stats.passedWhite}, B: ${stats.passedBlack}) have passed pawns.`
          : stats.passedWhite > 0 
            ? `White has ${stats.passedWhite} passed pawn(s) &mdash; endgame promotion lever.`
            : `Black has ${stats.passedBlack} passed pawn(s) &mdash; counterplay threat.`;
        this.el.passedStatusText.innerHTML = who;
      }
    }

    // 5. Card 4: Mobility, Bishop Pairs, Check
    if (this.el.featCardMobility) this.el.featCardMobility.textContent = `${stats.mobility} legal moves`;
    if (this.el.featCardInCheck) {
      this.el.featCardInCheck.textContent = stats.inCheck ? 'Yes' : 'No';
      this.el.featCardInCheck.style.color = stats.inCheck ? 'var(--swiss-red)' : 'var(--swiss-green)';
    }

    if (this.el.featCardWhiteBishopPair) {
      this.el.featCardWhiteBishopPair.textContent = stats.bishopPairWhite ? 'Active (≥2)' : 'Lost';
      this.el.featCardWhiteBishopPair.style.color = stats.bishopPairWhite ? 'var(--swiss-green)' : 'var(--text-muted)';
    }
    if (this.el.featCardBlackBishopPair) {
      this.el.featCardBlackBishopPair.textContent = stats.bishopPairBlack ? 'Active (≥2)' : 'Lost';
      this.el.featCardBlackBishopPair.style.color = stats.bishopPairBlack ? 'var(--swiss-green)' : 'var(--text-muted)';
    }

    if (this.el.featMobilityPct && this.el.featMobilityFill) {
      this.el.featMobilityPct.textContent = `${stats.mobility} / 60`;
      const mobRatio = Math.min(100, Math.round((stats.mobility / 60) * 100));
      this.el.featMobilityFill.style.width = `${mobRatio}%`;
    }
  }

  async testConnection() {
    this.el.btnTestConnection.disabled = true;
    this.el.connectionFeedback.textContent = 'Connecting to the local Python API...';
    this.el.connectionFeedback.className = 'connection-pill show';
    this.el.connectionFeedback.style.display = 'block';
    const result = await this.client.testConnection();
    this.el.connectionFeedback.textContent = result.message;
    this.el.connectionFeedback.className = `connection-pill ${result.success ? 'success' : 'error'} show`;
    this.el.btnTestConnection.disabled = false;
  }
}
// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new ChessApp();
});
