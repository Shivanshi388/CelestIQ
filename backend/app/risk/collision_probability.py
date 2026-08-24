import math
import sys
from pathlib import Path

# Resolve path for terminal execution
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.orbit.uncertainty import generate_error_ellipsoid

def calculate_collision_probability(miss_distance_km: float, error_radius_km: float, hard_body_radius_km: float = 0.01) -> float:
    """Calculates Probability of Collision (Pc) using a 2D Gaussian probability density function."""
    if error_radius_km == 0:
        return 0.0
    
    # Calculate standard 2D Gaussian probability with a hard body radius
    exponent = -(miss_distance_km**2) / (2 * (error_radius_km**2))
    pc = ( (hard_body_radius_km**2) / (2 * (error_radius_km**2)) ) * math.exp(exponent)
    return pc

def evaluate_risk(miss_distance_km: float, time_to_impact_mins: int) -> dict:
    """Evaluates the final threat level based on distance and uncertainty."""
    # 1. Get the error margin for the exact minute of impact
    ellipsoid = generate_error_ellipsoid(time_to_impact_mins)
    error_radius = ellipsoid["total_error_radius"]
    
    # 2. Calculate the raw probability
    pc = calculate_collision_probability(miss_distance_km, error_radius, hard_body_radius_km=0.01)
    pc_percentage = round(pc * 100, 6)
    
    # 3. Categorize the threat
    # Note: With a 10m hard body radius, max Pc is around 4e-5.
    if pc >= 0.00001:
        category = "CRITICAL"
        action = "Initiate Avoidance Maneuver"
    elif pc >= 0.000001:
        category = "ELEVATED"
        action = "Monitor Closely"
    else:
        category = "LOW"
        action = "No Action Required"
        
    return {
        "risk_category": category,
        "probability_percent": pc_percentage,
        "recommended_action": action
    }

# --- Quick Test Block ---
if __name__ == "__main__":
    # Hardcoding the results from your conjunction.py output
    miss_distance = 0.36
    impact_minute = 1
    
    print("--- ORBITAL RISK ASSESSMENT ---")
    print(f"Input: Miss Distance {miss_distance} km at T+{impact_minute} mins")
    
    assessment = evaluate_risk(miss_distance, impact_minute)
    
    print(f"Risk Category: {assessment['risk_category']}")
    print(f"Collision Probability: {assessment['probability_percent']}%")
    print(f"Action: {assessment['recommended_action']}")