import numpy as np
from backend.app.orbit import conjunction as conj


def test_closest_approach_parallel():
    r1 = np.array([7000e3, 0, 0])
    v1 = np.array([0, 7.5e3, 0])
    r2 = np.array([7000e3, 100, 0])
    v2 = np.array([0, 7.5e3, 0])
    tca, md = conj.closest_approach(r1, v1, r2, v2)
    assert abs(tca - 0.0) < 1e-6
    assert md > 0


def test_closest_approach_moving():
    r1 = np.array([7000e3, 0, 0])
    v1 = np.array([0, 7.5e3, 0])
    r2 = np.array([7000e3 + 10, -100, 0])
    v2 = np.array([0, 7.4e3, 0])
    tca, md = conj.closest_approach(r1, v1, r2, v2)
    assert isinstance(tca, float)
    assert md >= 0
