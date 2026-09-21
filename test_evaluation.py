"""Verify the recorded evaluation snapshot without making API calls."""

import json
import unittest
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.stats import spearmanr

ROOT = Path(__file__).resolve().parent
WEB = ROOT / "tabpfn_chess" / "web"


class EvaluationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.result = json.loads((WEB / "evaluation_results.json").read_text(encoding="utf-8"))
        cls.points = pd.DataFrame(cls.result["points"])

    def test_recorded_positions_and_targets_match_source_and_exclude_context(self):
        reference = pd.read_parquet(ROOT / "tabpfn_chess/data/reference_data.parquet", columns=["fen"])
        source = pd.read_parquet(
            ROOT / "data/scaling_context.parquet",
            columns=["fen", "phase", "target_win_prob", "target_cp_clipped"],
        )
        recorded = source.loc[self.points["source_row"]]
        self.assertEqual(recorded["fen"].tolist(), self.points["fen"].tolist())
        self.assertEqual(recorded["phase"].tolist(), self.points["phase"].tolist())
        np.testing.assert_array_equal(recorded["target_win_prob"], self.points["target_score"])
        np.testing.assert_array_equal(recorded["target_cp_clipped"], self.points["target_cp"])
        context_keys = set(reference["fen"].str.split().str[:4].str.join(" "))
        test_keys = set(self.points["fen"].str.split().str[:4].str.join(" "))
        self.assertFalse(context_keys & test_keys)
        self.assertEqual(len(test_keys), len(self.points))

    def test_plots_share_the_recorded_predictions_and_correct_metrics(self):
        script = (WEB / "evaluation_results.js").read_text(encoding="utf-8")
        self.assertEqual(
            json.loads(script.removeprefix("const CHESS_EVALUATION_RESULTS = ").removesuffix(";\n")),
            self.result,
        )
        target = self.points["target_score"].to_numpy()
        prediction = self.points["prediction_score"].to_numpy()
        target_cp = self.points["target_cp"].to_numpy()
        predicted_cp = self.points["prediction_cp"].to_numpy()
        np.testing.assert_array_equal(prediction, np.clip(self.points["prediction_raw"], 0, 1))
        np.testing.assert_allclose(target, 1 / (1 + 10 ** (-target_cp / 400)), atol=1e-7, rtol=0)
        bounded_scores = np.clip(prediction, 1 / (1 + 10**2.5), 1 / (1 + 10**-2.5))
        np.testing.assert_allclose(predicted_cp, 400 * np.log10(bounded_scores / (1 - bounded_scores)))
        metrics = self.result["metrics"]
        self.assertEqual(metrics["n"], len(target))
        self.assertAlmostEqual(metrics["mae_score"], np.abs(target - prediction).mean())
        self.assertAlmostEqual(metrics["mae_cp"], np.abs(target_cp - predicted_cp).mean())
        self.assertAlmostEqual(metrics["pearson_r"], np.corrcoef(target, prediction)[0, 1])
        self.assertAlmostEqual(metrics["spearman_rho"], spearmanr(target, prediction).statistic)
        self.assertAlmostEqual(
            metrics["r2"], 1 - np.sum((target - prediction) ** 2) / np.sum((target - target.mean()) ** 2)
        )
        for phase in self.result["phases"]:
            mask = self.points["phase"].to_numpy() == phase["phase"]
            self.assertEqual(phase["n"], int(mask.sum()))
            self.assertEqual(phase["n"], self.result["sampling"]["per_phase"])
            self.assertAlmostEqual(phase["mae_cp"], np.abs(target_cp[mask] - predicted_cp[mask]).mean())
            self.assertAlmostEqual(phase["mae_score"], np.abs(target[mask] - prediction[mask]).mean())


if __name__ == "__main__":
    unittest.main()
