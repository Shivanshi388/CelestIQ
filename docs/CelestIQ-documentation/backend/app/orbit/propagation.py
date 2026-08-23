import numpy as np


def propagate_linear(r0: np.ndarray, v0: np.ndarray, dt: float) -> np.ndarray:
    """Simple linear propagation: r(t) = r0 + v0 * dt"""
    return r0 + v0 * dt
