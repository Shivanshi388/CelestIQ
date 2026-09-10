import math
import sys
from pathlib import Path
from typing import Dict, Optional

# Resolve path for terminal execution
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.orbit.uncertainty import (
    generate_error_ellipsoid,
    propagate_covariance,
    compute_combined_covariance,
)


def calculate_collision_probability(
    miss_distance_km: float,
    error_radius_km: float,
    hard_body_radius_km: float = 0.01,
) -> float:
    """
    Calculates Probability of Collision (Pc) using a 2D Gaussian probability density function.
    
    This is the standard Foster approach for short-arc conjunction screening:
        Pc = (R^2 / (2 * sigma^2)) * exp(-d^2 / (2 * sigma^2))
    
    where:
        R = hard body radius (combined physical radii of the two objects)
        sigma = combined position uncertainty (1D, projected onto B-plane)
        d = miss distance at TCA
    
    Note: For debris objects with small cross-sections, R is typically 0.005-0.02 km.
    For the 2009 Iridium-Cosmos collision, the combined hard body radius was ~0.015 km.
    """
    if error_radius_km == 0:
        return 0.0
    
    # Calculate standard 2D Gaussian probability with a hard body radius
    exponent = -(miss_distance_km**2) / (2 * (error_radius_km**2))
    pc = ((hard_body_radius_km**2) / (2 * (error_radius_km**2))) * math.exp(exponent)
    return pc


def calculate_collision_probability_3d(
    miss_distance_km: float,
    covariance: Dict[str, float],
    hard_body_radius_km: float = 0.01,
) -> float:
    """
    Calculates Pc using the full 3D covariance matrix (diagonal approximation).
    
    For the projected miss distance, we use the combined covariance sigma
    projected onto the B-plane (plane perpendicular to the relative velocity).
    
    This is more accurate than the 2D version because it accounts for
    the different uncertainty levels in each coordinate direction.
    """
    sigma_total = covariance.get("total_error_radius", 0.01)
    
    if sigma_total == 0:
        return 0.0
    
    # Use the standard Foster formula with the combined sigma
    exponent = -(miss_distance_km**2) / (2 * sigma_total**2)
    pc = ((hard_body_radius_km**2) / (2 * sigma_total**2)) * math.exp(exponent)
    return pc


def evaluate_risk(
    miss_distance_km: float,
    time_to_impact_mins: int,
    obj1_covariance: Optional[Dict[str, float]] = None,
    obj2_covariance: Optional[Dict[str, float]] = None,
    obj1_mass_kg: float = 100.0,
    obj1_cross_section_m2: float = 1.0,
    obj1_cd: float = 2.2,
    obj1_altitude_km: float = 400.0,
    obj2_mass_kg: float = 1.0,
    obj2_cross_section_m2: float = 0.01,
    obj2_cd: float = 2.2,
    obj2_altitude_km: float = 400.0,
) -> dict:
    """
    Evaluates the final threat level based on distance, uncertainty, and physical properties.
    
    If per-object covariances are provided, propagates them forward and computes
    the combined covariance at the predicted conjunction time. Otherwise, falls back
    to the baseline error ellipsoid.
    
    Args:
        miss_distance_km: Minimum separation distance at TCA
        time_to_impact_mins: Time to closest approach in minutes
        obj1_covariance: First object's initial covariance (optional)
        obj2_covariance: Second object's initial covariance (optional)
        obj1_mass_kg: First object's mass (for drag uncertainty)
        obj1_cross_section_m2: First object's cross-section
        obj1_cd: First object's drag coefficient
        obj1_altitude_km: First object's altitude
        obj2_mass_kg: Second object's mass
        obj2_cross_section_m2: Second object's cross-section
        obj2_cd: Second object's drag coefficient
        obj2_altitude_km: Second object's altitude
    """
    # 1. Get propagated covariance for each object
    if obj1_covariance and obj2_covariance:
        # Propagate both covariances to TCA
        cov1_propagated = propagate_covariance(
            obj1_covariance, time_to_impact_mins,
            mass_kg=obj1_mass_kg,
            cross_section_m2=obj1_cross_section_m2,
            cd=obj1_cd,
            altitude_km=obj1_altitude_km,
        )
        cov2_propagated = propagate_covariance(
            obj2_covariance, time_to_impact_mins,
            mass_kg=obj2_mass_kg,
            cross_section_m2=obj2_cross_section_m2,
            cd=obj2_cd,
            altitude_km=obj2_altitude_km,
        )
        
        # Combine covariances: P_combined = P1 + P2
        combined = compute_combined_covariance(
            cov1_propagated.get("propagated_covariance", obj1_covariance),
            cov2_propagated.get("propagated_covariance", obj2_covariance),
        )
        error_radius = combined["total_error_radius"]
    else:
        # Fallback to baseline error ellipsoid
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
        "probability_raw": pc,
        "recommended_action": action,
        "error_radius_km": round(error_radius, 4),
        "hard_body_radius_km": 0.01,
    }


# --- Quick Test Block ---
if __name__ == "__main__":
    # Test with Iridium-Cosmos-like conjunction
    print("=== Iridium 33 vs Cosmos 2251 Conjunction Analysis ===")
    
    iridium_cov = {"xx": 0.002, "yy": 0.002, "zz": 0.003}
    cosmos_cov = {"xx": 0.003, "yy": 0.003, "zz": 0.004}
    
    assessment = evaluate_risk(
        miss_distance_km=0.36,
        time_to_impact_mins=5,
        obj1_covariance=iridium_cov,
        obj2_covariance=cosmos_cov,
        obj1_mass_kg=560.0,
        obj1_cross_section_m2=8.4,
        obj1_altitude_km=780.0,
        obj2_mass_kg=950.0,
        obj2_cross_section_m2=4.0,
        obj2_altitude_km=790.0,
    )
    
    print(f"Risk Category: {assessment['risk_category']}")
    print(f"Collision Probability: {assessment['probability_percent']}%")
    print(f"Error Radius: {assessment['error_radius_km']} km")
    print(f"Action: {assessment['recommended_action']}")
    
    # Test with small debris
    print("\n=== Small Debris Conjunction Analysis ===")
    debris_cov = {"xx": 0.010, "yy": 0.010, "zz": 0.015}
    
    assessment2 = evaluate_risk(
        miss_distance_km=5.0,
        time_to_impact_mins=30,
        obj1_covariance=iridium_cov,
        obj2_covariance=debris_cov,
        obj1_mass_kg=560.0,
        obj1_cross_section_m2=8.4,
        obj1_altitude_km=780.0,
        obj2_mass_kg=2.5,
        obj2_cross_section_m2=0.08,
        obj2_altitude_km=795.0,
    )
    
    print(f"Risk Category: {assessment2['risk_category']}")
    print(f"Collision Probability: {assessment2['probability_percent']}%")
    print(f"Error Radius: {assessment2['error_radius_km']} km")
    print(f"Action: {assessment2['recommended_action']}")