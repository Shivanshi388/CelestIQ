import numpy as np
from backend.app.manoeuvre import simulator as sim


def rank_candidates(r1, v1, r2, v2, candidates):
    """Rank candidates by (miss_distance_after - miss_distance_before) / delta_v_cost (higher is better)."""
    t0, md0 = sim.simulate_manoeuvre(r1, v1, r2, v2, np.zeros(3))
    scored = []
    for dv in candidates:
        t_after, md_after = sim.simulate_manoeuvre(r1, v1, r2, v2, dv)
        dv_cost = np.linalg.norm(dv) + 1e-12
        benefit = md_after - md0
        score = benefit / dv_cost
        scored.append((dv, score))
    # sort descending by score
    scored.sort(key=lambda x: x[1], reverse=True)
    return scored
