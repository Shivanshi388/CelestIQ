import math


def simple_risk_score(miss_distance_m: float):
    """Prototype risk score: inversely related to miss distance.
    Score in range (0, 1], higher means higher risk.
    """
    if miss_distance_m <= 0:
        return 1.0
    # scale: at 100 m -> ~0.01, at 1 m -> ~1.0
    score = 1.0 / (1.0 + (miss_distance_m / 1.0))
    # clamp
    return max(0.0, min(1.0, score))
