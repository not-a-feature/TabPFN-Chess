"""Record position predictions for the animation's evaluation plots."""

import argparse
import hashlib
import json
from datetime import datetime, timezone
from importlib.metadata import version
from pathlib import Path

import chess
import numpy as np
import pandas as pd
from scipy.stats import spearmanr

from tabpfn_chess.engine import REFERENCE_PATH
from tabpfn_chess.preprocess import extract_features, get_feature_names
from tabpfn_chess.server import EngineService

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "data" / "scaling_context.parquet"
PHASES = ("opening", "middlegame", "endgame")
SEED = 20260921
PER_PHASE = 100


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--device", default="api", help="api, cpu or cuda:0")
    args = parser.parse_args()
    reference = pd.read_parquet(REFERENCE_PATH)
    source = pd.read_parquet(SOURCE)
    reference_keys = set(reference["fen"].str.split().str[:4].str.join(" "))
    source_keys = source["fen"].str.split().str[:4].str.join(" ")
    candidates = source.loc[~source_keys.isin(reference_keys) & ~source_keys.duplicated()]
    selected = pd.concat(
        [
            candidates.loc[candidates["phase"] == phase].sample(PER_PHASE, random_state=SEED)
            for phase in PHASES
        ]
    )
    features = get_feature_names()
    X = selected[features].to_numpy(dtype=np.float32)
    encoded = []
    for fen in selected["fen"]:
        board = chess.Board(fen)
        assert board.is_valid(), fen
        encoded.append(extract_features(board))
    assert np.array_equal(X, np.stack(encoded)), "Stored features differ from the current encoder"
    target = selected["target_win_prob"].to_numpy(dtype=float)
    target_cp = selected["target_cp_clipped"].to_numpy(dtype=float)
    assert np.isfinite(X).all() and np.isfinite(target).all() and np.isfinite(target_cp).all()
    assert (np.abs(target_cp) <= 1000).all()
    assert np.allclose(target, 1 / (1 + 10 ** (-target_cp / 400)), atol=1e-7, rtol=0)
    print(f"Selected {len(selected)} positions disjoint from all {len(reference)} reference rows", flush=True)

    service = EngineService("cloud" if args.device == "api" else "local", args.device)
    service.fit()
    model = service.engine.model
    raw = np.asarray(model.predict(X), dtype=float)
    assert raw.shape == target.shape and np.isfinite(raw).all()
    prediction = np.clip(raw, 0, 1)
    score_bounds = 1 / (1 + 10 ** (-np.array([-1000.0, 1000.0]) / 400))
    bounded = np.clip(prediction, *score_bounds)
    prediction_cp = 400 * np.log10(bounded / (1 - bounded))
    points = [
        {
            "source_row": int(index),
            "fen": row["fen"],
            "phase": row["phase"],
            "target_score": float(target[i]),
            "target_cp": float(target_cp[i]),
            "prediction_raw": float(raw[i]),
            "prediction_score": float(prediction[i]),
            "prediction_cp": float(prediction_cp[i]),
        }
        for i, (index, row) in enumerate(selected.iterrows())
    ]
    phases = []
    for phase in PHASES:
        mask = selected["phase"].to_numpy() == phase
        phases.append(
            {
                "phase": phase,
                "n": int(mask.sum()),
                "mae_cp": float(np.abs(prediction_cp[mask] - target_cp[mask]).mean()),
                "mae_score": float(np.abs(prediction[mask] - target[mask]).mean()),
            }
        )
    with REFERENCE_PATH.open("rb") as reference_file, SOURCE.open("rb") as source_file:
        reference_hash = hashlib.file_digest(reference_file, "sha256").hexdigest()
        source_hash = hashlib.file_digest(source_file, "sha256").hexdigest()
    result = {
        "created_utc": datetime.now(timezone.utc).isoformat(),
        "model": {
            "version": "3.5",
            "backend": service.backend,
            "device": args.device,
            "context_size": 1000,
            "n_estimators": 8,
            "random_state": 42,
            "fit_mode": "fit_with_cache",
            "extra_features": True,
            "search": False,
        },
        "sampling": {
            "seed": SEED,
            "per_phase": PER_PHASE,
            "phase_source": "dataset phase column",
            "excluded_reference_rows": len(reference),
            "eligible_unique_positions": len(candidates),
            "position_identity": "first four FEN fields; clocks ignored",
            "limitation": "Position-disjoint evaluation; source-game overlap is unknown.",
        },
        "targets": {
            "score": "1 / (1 + 10 ** (-cp / 400)); not a calibrated win probability",
            "cp_range": [-1000, 1000],
            "cp_prediction": "inverse score transform, clipped to the target CP range",
            "provenance": "Existing dataset labels; Stockfish version and analysis depth not recorded here.",
        },
        "sources": {
            "reference_sha256": reference_hash,
            "evaluation_sha256": source_hash,
            "script_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            "encoder_sha256": hashlib.sha256((ROOT / "tabpfn_chess/preprocess.py").read_bytes()).hexdigest(),
        },
        "versions": {name: version(name) for name in ("tabpfn", "tabpfn-client", "numpy", "pandas", "scipy")},
        "metrics": {
            "n": len(points),
            "pearson_r": float(np.corrcoef(target, prediction)[0, 1]),
            "spearman_rho": float(spearmanr(target, prediction).statistic),
            "r2": float(1 - np.sum((target - prediction) ** 2) / np.sum((target - target.mean()) ** 2)),
            "mae_score": float(np.abs(target - prediction).mean()),
            "mae_cp": float(np.abs(target_cp - prediction_cp).mean()),
        },
        "phases": phases,
        "points": points,
    }
    serialized = json.dumps(result, indent=2, allow_nan=False)
    web = ROOT / "tabpfn_chess" / "web"
    (web / "evaluation_results.json").write_text(serialized + "\n", encoding="utf-8")
    (web / "evaluation_results.js").write_text(
        "const CHESS_EVALUATION_RESULTS = " + serialized + ";\n", encoding="utf-8"
    )
    print(json.dumps(result["metrics"], indent=2), flush=True)
    print(json.dumps(phases, indent=2), flush=True)


if __name__ == "__main__":
    main()
