import numpy as np


def closest_approach(r1: np.ndarray, v1: np.ndarray, r2: np.ndarray, v2: np.ndarray):
    """
    Compute time of closest approach and miss distance between two objects
    assuming linear motion r(t)=r0+v0*t.
    Returns (t_ca, miss_distance)
    """
    dr = r2 - r1
    dv = v2 - v1
    dv2 = np.dot(dv, dv)
    if dv2 == 0:
        # Parallel motion: closest at t=0
        tca = 0.0
    else:
        tca = -float(np.dot(dr, dv) / dv2)
    # allow negative tca; higher-level logic can clamp if required
    r_rel = dr + dv * tca
    miss_distance = float(np.linalg.norm(r_rel))
    return tca, miss_distance
