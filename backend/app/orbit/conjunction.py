import math
import sys
from pathlib import Path
from typing import List, Tuple, Dict, Optional

# Dynamically resolve project root for smooth imports
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.orbit.propagation import propagate_step
from app.orbit.uncertainty import propagate_covariance, compute_combined_covariance

def calculate_distance(pos1: List[float], pos2: List[float]) -> float:
    """Calculates the 3D spatial distance between two objects."""
    return math.sqrt((pos2[0] - pos1[0])**2 + (pos2[1] - pos1[1])**2 + (pos2[2] - pos1[2])**2)

def detect_conjunction(
    pos1: List[float], vel1: List[float],
    pos2: List[float], vel2: List[float],
    duration_mins: int, 
    threshold_km: float = 10.0,
    obj1_mass_kg: float = 100.0,
    obj1_cross_section_m2: float = 1.0,
    obj1_cd: float = 2.2,
    obj1_cr: float = 1.2,
    obj2_mass_kg: float = 1.0,
    obj2_cross_section_m2: float = 0.01,
    obj2_cd: float = 2.2,
    obj2_cr: float = 1.2,
    obj1_covariance: Optional[Dict[str, float]] = None,
    obj2_covariance: Optional[Dict[str, float]] = None,
) -> Tuple[bool, float, int, Dict]:
    """
    Simulates two orbits simultaneously and checks if they get dangerously close.
    
    Now includes:
    - Full perturbation model (gravity + drag + SRP) for both objects
    - Per-object physical properties for accurate propagation
    - Covariance propagation for uncertainty-aware conjunction screening
    
    Returns: (Collision Risk Boolean, Minimum Distance, Minute of Closest Approach, metadata dict)
    """
    min_distance = float('inf')
    risk_minute = 0
    time_step = 60.0 # 60-second steps
    
    current_p1, current_v1 = pos1, vel1
    current_p2, current_v2 = pos2, vel2
    
    # Track covariance propagation if provided
    min_distance_cov = None
    
    for minute in range(1, duration_mins + 1):
        # Propagate both satellites by one minute with full perturbations
        current_p1, current_v1 = propagate_step(
            current_p1, current_v1, time_step,
            mass_kg=obj1_mass_kg,
            cross_section_m2=obj1_cross_section_m2,
            cd=obj1_cd,
            cr=obj1_cr,
        )
        current_p2, current_v2 = propagate_step(
            current_p2, current_v2, time_step,
            mass_kg=obj2_mass_kg,
            cross_section_m2=obj2_cross_section_m2,
            cd=obj2_cd,
            cr=obj2_cr,
        )
        
        # Calculate how far apart they are
        dist = calculate_distance(current_p1, current_p2)
        
        if dist < min_distance:
            min_distance = dist
            risk_minute = minute
            
            # Propagate covariances to this time if available
            if obj1_covariance and obj2_covariance:
                cov1_prop = propagate_covariance(
                    obj1_covariance, minute,
                    mass_kg=obj1_mass_kg,
                    cross_section_m2=obj1_cross_section_m2,
                    cd=obj1_cd,
                    altitude_km=max(0, math.sqrt(current_p1[0]**2 + current_p1[1]**2 + current_p1[2]**2) - 6378.137),
                )
                cov2_prop = propagate_covariance(
                    obj2_covariance, minute,
                    mass_kg=obj2_mass_kg,
                    cross_section_m2=obj2_cross_section_m2,
                    cd=obj2_cd,
                    altitude_km=max(0, math.sqrt(current_p2[0]**2 + current_p2[1]**2 + current_p2[2]**2) - 6378.137),
                )
                min_distance_cov = compute_combined_covariance(
                    cov1_prop.get("propagated_covariance", obj1_covariance),
                    cov2_prop.get("propagated_covariance", obj2_covariance),
                )
            
    has_collision_risk = min_distance <= threshold_km
    
    metadata = {
        "min_distance_km": round(min_distance, 4),
        "closest_approach_minute": risk_minute,
        "threshold_km": threshold_km,
        "has_collision_risk": has_collision_risk,
    }
    
    if min_distance_cov:
        metadata["combined_covariance"] = min_distance_cov
    
    return has_collision_risk, min_distance, risk_minute, metadata

# --- Quick Test Block ---
if __name__ == "__main__":
    # Satellite 1: Celestiq-Alpha (from our CSV)
    alpha_pos = [6700.0, 0.0, 0.0]
    alpha_vel = [0.0, 7.67, 0.0]
    
    # Satellite 2: Enemy Debris (Intentionally placed on a crash trajectory)
    debris_pos = [6700.0, 100.0, 0.0]
    debris_vel = [0.0, 6.0, 0.0] 
    
    # Physical properties for collision analysis
    alpha_mass = 560.0  # kg
    alpha_area = 8.4    # m^2
    debris_mass = 2.5   # kg
    debris_area = 0.08  # m^2
    
    # Covariance (initial tracking uncertainty)
    alpha_cov = {"xx": 0.002, "yy": 0.002, "zz": 0.003}
    debris_cov = {"xx": 0.010, "yy": 0.010, "zz": 0.015}
    
    print("Running 90-minute conjunction screening with physical properties...")
    
    is_risk, closest_approach, minute, metadata = detect_conjunction(
        alpha_pos, alpha_vel, debris_pos, debris_vel, 
        duration_mins=90, threshold_km=5.0,
        obj1_mass_kg=alpha_mass, obj1_cross_section_m2=alpha_area,
        obj2_mass_kg=debris_mass, obj2_cross_section_m2=debris_area,
        obj1_covariance=alpha_cov, obj2_covariance=debris_cov,
    )
    
    print(f"Risk Detected: {is_risk}")
    print(f"Closest Approach: {closest_approach:.2f} km")
    print(f"Time to Impact: {minute} minutes")
    if "combined_covariance" in metadata:
        cc = metadata["combined_covariance"]
        print(f"Combined Error Radius: {cc['total_error_radius']:.4f} km")