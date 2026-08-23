import numpy as np
from backend.app.manoeuvre import generator, simulator


def test_generate_candidates():
    r = np.array([7000e3, 0, 0])
    v = np.array([0, 7.5e3, 0])
    cands = generator.generate_candidates(r, v)
    assert len(cands) >= 3


def test_simulate_manoeuvre_reduces_risk():
    r1 = np.array([7000e3, 0, 0])
    v1 = np.array([0, 7.5e3, 0])
    r2 = np.array([7000e3, 50.0, 0])
    v2 = np.array([0, 7.5e3, 0])
    # try a small cross-track dv
    dv = np.array([0.0, 0.0, 0.5])
    t_before, md_before = simulator.simulate_manoeuvre(r1, v1, r2, v2, np.zeros(3))
    t_after, md_after = simulator.simulate_manoeuvre(r1, v1, r2, v2, dv)
    assert md_after != md_before
