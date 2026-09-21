// UI transport only. All fitting, feature extraction for inference and move search run in Python.
class ChessEngineClient {
  constructor() {
    this.storageKey = 'tabpfn_chess_settings_v4';
    this.config = {model: '3.5', contextSize: 1000, searchHorizon: 2,
      useExtraFeatures: true, useTacticalSafety: true};
    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      for (const key of Object.keys(this.config)) if (Object.hasOwn(saved, key)) this.config[key] = saved[key];
      // Remove credentials retained by the former browser-only transport.
      localStorage.removeItem('tabpfn_chess_byok');
    } catch (error) {console.warn('Settings storage unavailable:', error.message);}
    if (![100, 1000, 10000].includes(this.config.contextSize)) this.config.contextSize = 1000;
    this.lastAnalysis = null;
  }

  saveConfig(config) {
    this.config = {...this.config, ...config};
    this.lastAnalysis = null;
    try {localStorage.setItem(this.storageKey, JSON.stringify(this.config));}
    catch (error) {console.warn('Settings could not be saved:', error.message);}
  }

  async testConnection() {
    try {
      const response = await fetch('/api/health', {signal: AbortSignal.timeout(10000)});
      if (!response.ok) throw new Error(`Python API returned HTTP ${response.status}`);
      const status = await response.json();
      if (status.status !== 'ok') throw new Error('Unexpected Python API response');
      return {success: true, message: `Python API connected · ${status.backend} · ${status.device}`};
    } catch {return {success: false, message: 'Start tabpfn-chess and open its localhost URL.'};}
  }

  async rankMoves(board, onStatus = null) {
    if (board.game_over()) return {moves: [], engineUsed: 'Game over'};
    const initial = new Chess(board.fen());
    const history = board.history({verbose: true});
    // PGN FEN header preserves custom setup positions; ordinary games start normally.
    const payload = {initialFen: board.header().FEN || new Chess().fen(),
      moves: history.map(move => move.from + move.to + (move.promotion || '')),
      fen: initial.fen(), config: {...this.config}};
    const key = JSON.stringify(payload);
    if (this.lastAnalysis && this.lastAnalysis.key === key) return this.lastAnalysis.promise;
    if (onStatus) onStatus('Python is evaluating moves. The first request fits the context; later moves reuse it.');
    const promise = this.analyse(payload);
    this.lastAnalysis = {key, promise};
    const result = await promise;
    if (result.error && this.lastAnalysis && this.lastAnalysis.key === key) this.lastAnalysis = null;
    return result;
  }

  async analyse(payload) {
    try {
      const response = await fetch('/api/analyse', {method: 'POST',
        headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Python API returned HTTP ${response.status}`);
      if (!Array.isArray(result.moves) || result.fen !== payload.fen) throw new Error('Invalid Python analysis response');
      return result;
    } catch (error) {
      return {moves: [], engineUsed: 'Python engine unavailable',
        error: `Could not evaluate this position: ${error.message}. Open the URL printed by tabpfn-chess.`};
    }
  }
}
if (typeof window !== 'undefined') window.ChessEngineClient = ChessEngineClient;
if (typeof module !== 'undefined') module.exports = {ChessEngineClient};
