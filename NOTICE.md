# Copyright and third-party attribution

Copyright © 2026 Jules Kreuer. **Licensed under the EUPL, Version 1.2 only.**
The full license is in [LICENSE](LICENSE). This applies to original project code
and documentation; it does not replace the following third-party licenses.

| Component | Attribution and license |
| --- | --- |
| `tabpfn_chess/web/chess.js` | chess.js 0.12.0, copyright 2021 Jeff Hlywa, BSD-2-Clause; full notice retained in source and `licenses/chess.js-BSD-2-Clause.txt` |
| SVG piece paths in `tabpfn_chess/web/pieces.js` | Cburnett and contributors, Wikimedia Commons chess pieces; distributed using its BSD-3-Clause option, full text in `licenses/Cburnett-BSD-3-Clause.txt` |
| Context/evaluation data and packaged reference context | mateuszgrzyb, Lichess evaluation data; CC-BY-4.0, full text in `licenses/CC-BY-4.0.txt`; transformations described in benchmarks/README.md |
| Opening book and derived opening suite | Lichess chess-openings contributors, CC0-1.0; full text in `licenses/CC0-1.0.txt` |

Cburnett pieces are embedded as SVG strings with path/attribute formatting
adaptations. Original file pages use names `Chess_plt45.svg`, `Chess_pdt45.svg`,
and corresponding `n`, `b`, `r`, `q`, `k` piece letters, available through
[Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).
Examples: [white pawn](https://commons.wikimedia.org/wiki/File:Chess_plt45.svg),
[white knight](https://commons.wikimedia.org/wiki/File:Chess_nlt45.svg), and
[black king](https://commons.wikimedia.org/wiki/File:Chess_kdt45.svg).

Dependencies are installed separately and retain their licenses. In particular,
[python-chess](https://github.com/niklasf/python-chess) uses GPL-3.0-or-later;
[TabPFN](https://github.com/PriorLabs/TabPFN) and
[tabpfn-client](https://github.com/PriorLabs/tabpfn-client) use Apache-2.0 for their
library code. TabPFN model access has separate upstream conditions; weights are
not bundled or relicensed here. Stockfish is installed separately under GPL-3.0
and is not included in the distribution.

The optional Google Fonts stylesheet serves Inter, JetBrains Mono and Newsreader
from Google's service; font files are not bundled. System fallback fonts are used
when unavailable. No API tokens, fitted caches or private model weights belong
in a source release.
