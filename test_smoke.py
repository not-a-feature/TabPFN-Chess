"""Small offline checks for the launcher and the shared engine."""

import contextlib
import http.client
import io
import json
import threading
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import numpy as np

from tabpfn_chess.server import EngineService, create_server, main


class SmokeTests(unittest.TestCase):
    def launch(self, args):
        server = MagicMock(server_port=8123)
        server.serve_forever.side_effect = KeyboardInterrupt
        output = io.StringIO()
        with (
            patch("tabpfn_chess.server.create_server") as create,
            patch("tabpfn_chess.server.EngineService.fit") as fit,
            patch("tabpfn_chess.server.webbrowser.open") as browser,
            contextlib.redirect_stdout(output),
        ):
            create.return_value.__enter__.return_value = server
            main(args)
        fit.assert_called_once_with()
        return create.call_args.args[1], browser, output.getvalue()

    def test_local_devices_print_url_and_open_browser(self):
        for device in ("cpu", "cuda:0", "cuda:1"):
            service, browser, text = self.launch(["--device", device])
            self.assertEqual((service.backend, service.device), ("local", device))
            browser.assert_called_once_with("http://127.0.0.1:8123/")
            self.assertIn("http://127.0.0.1:8123/", text)
        for available, expected in ((True, "cuda:0"), (False, "cpu")):
            with patch("tabpfn_chess.server.torch.cuda.is_available", return_value=available):
                service, browser, text = self.launch(["--no-browser"])
            self.assertEqual((service.backend, service.device), ("local", expected))
            browser.assert_not_called()
            self.assertIn(f"TabPFN Chess ({expected})", text)

    def test_api_key_precedence_and_no_key_in_output(self):
        for args, env, expected in [
            (["--key", "sk-explicit"], {"TABPFN_TOKEN": "env-token"}, "sk-explicit"),
            ([], {"TABPFN_TOKEN": "env-token", "TABPFN_API_KEY": "alias"}, "env-token"),
            ([], {"TABPFN_API_KEY": "alias"}, "alias"),
        ]:
            with (
                patch.dict("os.environ", env, clear=True),
                patch("tabpfn_chess.server.import_module") as load,
            ):
                service, _, output = self.launch(["--device", "api", *args])
                load.return_value.set_access_token.assert_called_once_with(expected)
                self.assertEqual(service.backend, "cloud")
                self.assertNotIn(expected, output)

    def test_missing_api_key_fails_before_starting(self):
        with (
            patch.dict("os.environ", {}, clear=True),
            patch("tabpfn_chess.server.create_server") as create,
            contextlib.redirect_stderr(io.StringIO()),
        ):
            with self.assertRaises(SystemExit) as error:
                main(["--device", "api"])
            self.assertEqual(error.exception.code, 2)
            create.assert_not_called()

    def test_hanging_queen_and_cache_reuse(self):
        fits = []
        model = SimpleNamespace(fit=lambda x, y: fits.append(len(x)), predict=lambda x: np.full(len(x), 0.5))
        service = EngineService(model_factory=lambda version: model)
        fen = "7k/8/8/8/4q3/8/4R3/6K1 w - - 0 1"
        payload = {
            "initialFen": fen,
            "moves": [],
            "fen": fen,
            "config": {
                "model": "3.5",
                "contextSize": 100,
                "searchHorizon": 2,
                "useExtraFeatures": True,
                "useTacticalSafety": True,
            },
        }
        service.fit()
        for size in (1000, 100, 10000):
            payload["config"]["contextSize"] = size
            result = service.analyse(payload)
            self.assertEqual(result["moves"][0]["uci"], "e2e4")
            self.assertIs(service.analyse(payload), result)
        self.assertEqual(fits, [1000, 100, 10000])

    def test_inference_error_diagnostics_do_not_expose_credentials(self):
        trace_id = "a" * 32
        failure = RuntimeError(
            f"Fail to call predict: [HTTP 500] upstream error. Report trace ID: {trace_id}. "
            "Bearer secret-token https://example.test/predictions?signature=secret"
        )
        service = SimpleNamespace(analyse=MagicMock(side_effect=[failure, {"moves": []}]))
        fen = "7k/8/8/8/4q3/8/4R3/6K1 w - - 0 1"
        payload = {
            "initialFen": fen,
            "moves": [],
            "fen": fen,
            "config": {
                "model": "3.5",
                "contextSize": 1000,
                "searchHorizon": 2,
                "useExtraFeatures": True,
                "useTacticalSafety": True,
            },
        }
        output = io.StringIO()
        with create_server(Path(__file__).parent / "tabpfn_chess" / "web", service, 0) as server:
            connection = http.client.HTTPConnection("127.0.0.1", server.server_port, timeout=5)
            self.addCleanup(connection.close)
            for expected_status in (503, 200):
                worker = threading.Thread(target=server.handle_request, daemon=True)
                with contextlib.redirect_stdout(output):
                    worker.start()
                    connection.request(
                        "POST", "/api/analyse", json.dumps(payload), {"Content-Type": "application/json"}
                    )
                    response = connection.getresponse()
                    body = response.read().decode()
                    worker.join(timeout=5)
                self.assertFalse(worker.is_alive())
                self.assertEqual(response.status, expected_status)
                if expected_status == 503:
                    self.assertIn("HTTP 500", body)
                    self.assertIn(trace_id, body)
                    self.assertNotIn("secret", body)
                    self.assertNotIn("https://", body)
        self.assertIn(trace_id, output.getvalue())
        self.assertNotIn("secret", output.getvalue())
        self.assertNotIn("https://", output.getvalue())


if __name__ == "__main__":
    unittest.main()
