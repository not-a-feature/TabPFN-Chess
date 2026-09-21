"""Explicit TabPFN checkpoint and estimator configuration."""

from typing import Any, Protocol, runtime_checkable

import numpy as np
from tabpfn import TabPFNRegressor
from tabpfn.constants import ModelVersion

TABPFN_VERSIONS = {
    "3.5": ModelVersion.V3_5,
    "3.0": ModelVersion.V3,
    "2.5": ModelVersion.V2_5,
    "2.0": ModelVersion.V2,
}


@runtime_checkable
class InContextModel(Protocol):
    def fit(self, X: np.ndarray, y: np.ndarray) -> Any: ...

    def predict(self, X: np.ndarray) -> np.ndarray: ...


def get_tabpfn_model(version: str = "3.5", device: str = "auto", random_state: int = 42) -> InContextModel:
    assert version in TABPFN_VERSIONS, (
        f"Unsupported TabPFN version '{version}'. Supported: {list(TABPFN_VERSIONS)}"
    )
    return TabPFNRegressor.create_default_for_version(
        TABPFN_VERSIONS[version],
        n_estimators=8,
        ignore_pretraining_limits=True,
        device=device,
        random_state=random_state,
        fit_mode="fit_with_cache",
        keep_cache_on_device=False,
    )


def get_in_context_model(
    family: str = "tabpfn",
    version: str = "3.5",
    device: str = "auto",
    random_state: int = 42,
    **kwargs: Any,
) -> InContextModel:
    assert family in ["tabpfn", "tabicl", "custom"], (
        f"Unsupported model family '{family}'. Supported: ['tabpfn', 'tabicl', 'custom']"
    )

    if family == "tabpfn":
        return get_tabpfn_model(version=version, device=device, random_state=random_state)
    elif family == "tabicl":
        raise NotImplementedError(
            "TabICL backend hook registered; TabICL package integration available for benchmark extension."
        )
    elif family == "custom":
        model_inst = kwargs["model_instance"]
        assert isinstance(model_inst, InContextModel), "Custom model must implement fit(X, y) and predict(X)"
        return model_inst

    raise ValueError(f"Unrecognized family configuration: {family}")
