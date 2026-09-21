// Static snapshots also work with file:// and require no Python backend.
const scalingBody = document.getElementById('scalingResultsBody');
scalingBody.innerHTML = CHESS_SCALING_RESULTS.rows.map(row => {
  const result = row.match?.results;
  const games = result ? `${result.games} / ${CHESS_SCALING_RESULTS.planned_games_per_context}${result.censored ? ` (${result.censored} unfinished)` : ''}` : `0 / ${CHESS_SCALING_RESULTS.planned_games_per_context}`;
  const record = result ? `${result.wins} / ${result.draws} / ${result.losses}` : '—';
  const elo = result?.elo == null ? '—' : Math.round(result.elo).toLocaleString();
  const interval = !result ? '—' : result.interval_method === 'insufficient opening pairs' ? 'Needs more pairs' : `${result.elo_low == null ? '−∞' : Math.round(result.elo_low)} to ${result.elo_high == null ? '+∞' : Math.round(result.elo_high)}`;
  const latency = row.latency_pilot ? `${row.latency_pilot.move_seconds.toFixed(1)} s` : 'Not recorded';
  const cachedLatency = row.cached_latency_pilot ? `${row.cached_latency_pilot.move_seconds.toFixed(1)} s` : 'Not recorded';
  return `<tr><th scope="row">${row.context.toLocaleString()}</th><td>${games}</td><td>${record}</td>
    <td>${elo}</td><td>${interval}</td><td>${latency}</td><td>${cachedLatency}</td></tr>`;
}).join('');
document.getElementById('opponentResultsBody').innerHTML = CHESS_SCALING_RESULTS.rows.flatMap(row =>
  CHESS_SCALING_RESULTS.anchors.map(anchor => {
    const result = row.match?.results.by_opponent.find(opponent => opponent.anchor === anchor);
    return `<tr><th scope="row">${row.context.toLocaleString()}</th><td>${anchor}</td>
      <td>${result ? result.games - result.censored : 0} / 80</td>
      <td>${result ? `${result.wins} / ${result.draws} / ${result.losses}` : '—'}</td></tr>`;
  })
).join('');
document.getElementById('scalingCaption').textContent = `Context scaling · ${CHESS_SCALING_RESULTS.complete ? 'completed' : 'preliminary'} match results`;
document.getElementById('scalingUpdated').textContent = `Results snapshot: ${new Date(CHESS_SCALING_RESULTS.updated_utc).toLocaleString()}.`;
