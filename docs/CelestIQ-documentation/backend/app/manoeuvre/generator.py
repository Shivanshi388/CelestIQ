import numpy as np


def generate_candidates(r: np.ndarray, v: np.ndarray):
    """Generate simple candidate delta-v vectors (m/s).
    Directions: along-track (v/|v|), radial (r/|r|), cross-track = v x r
    Magnitudes: small set [0.1, 0.5, 1.0] m/s
    """
    vnorm = v / (np.linalg.norm(v) + 1e-12)
    rnorm = r / (np.linalg.norm(r) + 1e-12)
    cross = np.cross(v, r)
    crossnorm = cross / (np.linalg.norm(cross) + 1e-12)
    mags = [0.1, 0.5, 1.0]
    candidates = []
    dirs = [vnorm, rnorm, crossnorm]
    for d in dirs:
        for m in mags:
            candidates.append(d * m)
    return candidates
