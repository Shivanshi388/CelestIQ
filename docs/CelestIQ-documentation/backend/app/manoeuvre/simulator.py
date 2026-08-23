import numpy as np
from backend.app.orbit import conjunction as conj_mod


def simulate_manoeuvre(r1, v1, r2, v2, delta_v):
    """Apply instantaneous delta_v to primary (r1,v1) and compute new closest approach to (r2,v2).
    Returns (tca_after, miss_distance_after)
    """
    v1_new = v1 + delta_v
    tca, md = conj_mod.closest_approach(r1, v1_new, r2, v2)
    return tca, md
