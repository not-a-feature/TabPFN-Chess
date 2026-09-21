"""Loopback HTTP API: the showcase calls the same Python engine as experiments."""

import argparse
import gc
import json
import os
import re
import threading
import time
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from importlib import import_module
from pathlib import Path
from urllib.parse import urlsplit

import chess
import torch

from .engine import InContextChessEngine, terminal_score
from .model_registry import get_tabpfn_model
from .preprocess import extract_features


def parse_position(payload):
    if set(payload) != {"initialFen", "moves", "fen", "config"}:
        raise ValueError("Expected initialFen, moves, fen and config")
    if not isinstance(payload["moves"], list) or len(payload["moves"]) > 2000:
        raise ValueError("Invalid move history")
    board = chess.Board(payload["initialFen"])
    if not board.is_valid():
        raise ValueError("Invalid initial position")
    for move in payload["moves"]:
        board.push_uci(move)
    if board.fen(en_passant="fen") != payload["fen"] or not board.is_valid():
        raise ValueError("Position does not match its move history")
    config = payload["config"]
    if set(config) != {"model", "contextSize", "searchHorizon", "useExtraFeatures", "useTacticalSafety"}:
        raise ValueError("Invalid engine settings")
    if config["model"] not in ("3.5", "3.0") or config["contextSize"] not in (100, 1000, 10000):
        raise ValueError("Unsupported model or context size")
    if type(config["searchHorizon"]) is not int or config["searchHorizon"] not in (1, 2, 4):
        raise ValueError("Search horizon must be 1, 2 or 4")
    if any(type(config[key]) is not bool for key in ("useExtraFeatures", "useTacticalSafety")):
        raise ValueError("Feature and tactical settings must be booleans")
    return board, config


class EngineService:
    def __init__(self, backend="local", device="auto", model_factory=None):
        self.backend = backend
        self.device = device
        self.model_factory = model_factory or self.make_model
        self.lock = threading.Lock()
        self.engine = None
        self.engine_key = None
        self.last_request = None
        self.last_result = None

    def make_model(self, version):
        if self.backend == "local":
            return get_tabpfn_model(version=version, device=self.device)
        client = import_module("tabpfn_client")
        return client.TabPFNRegressor(
            model_path={"3.5": "v3.5_default", "3.0": "v3_default"}[version],
            n_estimators=8,
            random_state=42,
            ignore_pretraining_limits=True,
            fit_mode="fit_with_cache",
        )

    def _fit(self, model_version, context_size, use_extra_features):
        engine_key = (model_version, context_size, use_extra_features)
        if engine_key == self.engine_key:
            return
        self.engine = None
        self.engine_key = None
        gc.collect()
        self.engine = InContextChessEngine(
            model=self.model_factory(model_version),
            model_version=model_version,
            max_in_context=context_size,
            use_extra_features=use_extra_features,
        )
        self.engine_key = engine_key
        self.last_request = None
        self.last_result = None

    def fit(self, model_version="3.5", context_size=1000, use_extra_features=True):
        with self.lock:
            self._fit(model_version, context_size, use_extra_features)

    def analyse(self, payload):
        board, config = parse_position(payload)
        request_key = json.dumps(payload, sort_keys=True)
        with self.lock:
            if request_key == self.last_request:
                return self.last_result
            started = time.monotonic()
            features = extract_features(board)
            if not config["useExtraFeatures"]:
                features[773:] = 0
            ranked = []
            if terminal_score(board) is None:
                self._fit(config["model"], config["contextSize"], config["useExtraFeatures"])
                ranked = self.engine.rank_moves(
                    board,
                    horizon_moves=config["searchHorizon"] // 2,
                    use_tactical_safety=config["useTacticalSafety"],
                )
            moves = [
                {
                    "uci": item["uci"],
                    "san": item["san"],
                    "scoreCp": item["score_cp"],
                    "whiteWinProb": item["white_win_prob"],
                    "playerWinProb": item["player_win_prob"],
                    "safetyDelta": item["safety_delta"],
                    "pv": item["pv"],
                    "move": {
                        "from": item["uci"][:2],
                        "to": item["uci"][2:4],
                        **({"promotion": item["uci"][4]} if len(item["uci"]) == 5 else {}),
                    },
                }
                for item in ranked
            ]
            result = {
                "moves": moves,
                "features": features.tolist(),
                "fen": payload["fen"],
                "engineUsed": f"Python TabPFN {config['model']} · {self.backend} · N={config['contextSize']} · {config['searchHorizon']}-ply",
                "elapsedSeconds": time.monotonic() - started,
            }
            self.last_request, self.last_result = request_key, result
            return result


class ChessHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(args[2].web_root), **kwargs)

    def same_origin(self):
        port = self.server.server_port
        hosts = {f"localhost:{port}", f"127.0.0.1:{port}"}
        return self.headers["Host"] in hosts and self.headers["Origin"] in {
            None,
            f"http://{self.headers['Host']}",
        }

    def send_json(self, status, data):
        body = json.dumps(data, allow_nan=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if not self.same_origin():
            self.send_json(403, {"error": "Use the local server origin"})
        elif urlsplit(self.path).path == "/api/health":
            self.send_json(
                200,
                {
                    "status": "ok",
                    "backend": self.server.service.backend,
                    "device": self.server.service.device,
                },
            )
        else:
            super().do_GET()

    def do_POST(self):
        if not self.same_origin():
            self.send_json(403, {"error": "Use the local server origin"})
            return
        if self.path != "/api/analyse":
            self.send_json(404, {"error": "Unknown API route"})
            return
        try:
            length = int(self.headers["Content-Length"] or "0")
            if self.headers["Transfer-Encoding"] or not 0 < length <= 65536:
                raise ValueError("Expected a JSON request of at most 64 KiB")
            if self.headers["Content-Type"] != "application/json":
                raise ValueError("Content-Type must be application/json")
            payload = json.loads(self.rfile.read(length))
            if not isinstance(payload, dict):
                raise ValueError("Expected a JSON object")
            parse_position(payload)
        except (ValueError, TypeError, KeyError, AttributeError):
            self.send_json(400, {"error": "Invalid position, history or engine settings"})
            return
        try:
            result = self.server.service.analyse(payload)
        except (RuntimeError, OSError, ImportError) as error:
            # Only copy structured diagnostics; upstream messages can contain credentials or signed URLs.
            details = [type(error).__name__]
            status = re.search(r"\[HTTP (\d{3})\]", str(error))
            trace = re.search(r"[Tt]race ID: ([0-9a-f]{32})\b", str(error))
            if status:
                details.append(f"HTTP {status[1]}")
            if trace:
                details.append(f"Trace ID: {trace[1]}")
            summary = "; ".join(details)
            print(f"Inference failed: {summary}", flush=True)
            self.send_json(
                503,
                {
                    "error": f"Python inference failed ({summary}). "
                    "Check model access, server configuration and available memory."
                },
            )
            return
        self.send_json(200, result)


def create_server(web_root, service, port=8000):
    server = ThreadingHTTPServer(("127.0.0.1", port), ChessHandler)
    server.web_root = Path(web_root).resolve()
    server.service = service
    return server


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument(
        "--device",
        help="cpu, cuda:0 (or another CUDA index), or api; omitted selects CUDA when available",
    )
    parser.add_argument(
        "--key", help="PriorLabs key for --device api; otherwise uses TABPFN_TOKEN or TABPFN_API_KEY"
    )
    parser.add_argument("--no-browser", action="store_true", help="Print the URL without opening a browser")
    args = parser.parse_args(argv)
    device = args.device or ("cuda:0" if torch.cuda.is_available() else "cpu")
    if not re.fullmatch(r"cpu|cuda(?::\d+)?|api", device):
        parser.error("--device must be cpu, cuda:0 (or another CUDA index), or api")
    if args.key and device != "api":
        parser.error("--key is only used with --device api")
    if device == "api":
        key = args.key
        if not key:
            for name in ("TABPFN_TOKEN", "TABPFN_API_KEY"):
                if name in os.environ and os.environ[name].strip():
                    key = os.environ[name].strip()
                    break
        if not key or not key.strip():
            parser.error("API mode requires --key, TABPFN_TOKEN or TABPFN_API_KEY")
        import_module("tabpfn_client").set_access_token(key.strip())
    backend = "cloud" if device == "api" else "local"
    web_root = Path(__file__).resolve().parent / "web"
    if not (web_root / "index.html").is_file():
        parser.error("Web files are missing. Reinstall tabpfn-chess.")
    service = EngineService(backend, device)
    with create_server(web_root, service, args.port) as server:
        print(f"Preparing TabPFN 3.5 with 1,000 reference positions on {device}...", flush=True)
        service.fit()
        url = f"http://127.0.0.1:{server.server_port}/"
        print(f"\nTabPFN Chess ({device})\n{url}\nPress Ctrl+C to stop.\n", flush=True)
        if not args.no_browser:
            webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
