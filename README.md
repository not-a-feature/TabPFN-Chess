# TabPFN Chess

Chess demo with a local Python engine and a browser UI.

```sh
pip install .
tabpfn-chess
tabpfn-chess --device api --key sk-...
tabpfn-chess --device cpu
tabpfn-chess --device cuda:0
```

Install from the project directory into your active Python environment. Then run
`tabpfn-chess` from any directory; the webpage and reference context are included.
The command prints the local URL and opens your browser automatically.
Without `--device`, it selects `cuda:0` when CUDA is available and otherwise uses CPU.
Use `--port 8001` to change the port or `--no-browser` to print the link only.
For development, use `pip install -e .` with the same command.

For API mode, you can omit `--key` and set `TABPFN_TOKEN` or `TABPFN_API_KEY`.
An explicit `--key` takes precedence. The Python server uses the official
`tabpfn-client`; credentials are never sent to or stored in the browser.
API mode exits before starting the server when no key is available.
API mode builds a server-side KV cache during fitting and reuses it for later
predictions. Local CPU/CUDA modes also reuse their KV cache.

Local CPU/CUDA modes use `tabpfn`. The first request loads the weights and fits
the context; later moves reuse it. The server pre-fits the default TabPFN 3.5 model
with 1,000 reference positions before opening the browser. CPU startup can take a minute or more.
The webpage offers 100, 1,000 or 10,000 context positions. Python performs all move
selection, so the webpage and command-line engine use the same implementation.
The 19 additional features are shown with their current values in the UI.

- `tabpfn_chess/`: engine, encoder, local API and bundled `web/` showcase.
- `data/`: context dataset and opening suite.

The match study covers **100, 1k and 10k contexts**, 400 games each. 

Original code: [EUPL-1.2](LICENSE). [Third-party attribution](NOTICE.md).
