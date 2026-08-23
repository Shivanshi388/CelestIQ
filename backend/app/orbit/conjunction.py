import math
import sys
from pathlib import Path
from typing import List, Tuple

# Dynamically resolve project root for smooth imports
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.orbit.propagation import propagate_step

def calculate_distance(pos1: List[float], pos2: List[float]) -> float:
    """Calculates the 3D spatial distance between two objects."""
    return math.sqrt((pos2[0] - pos1[0])**2 + (pos2[1] - pos1[1])**2 + (pos2[2] - pos1[2])**2)

def detect_conjunction(
    pos1: List[float], vel1: List[float],
    pos2: List[float], vel2: List[float],
    duration_mins: int, 
    threshold_km: float = 10.0
) -> Tuple[bool, float, int]:
    """
    Simulates two orbits simultaneously and checks if they get dangerously close.
    Returns: (Collision Risk Boolean, Minimum Distance, Minute of Closest Approach)
    """
    min_distance = float('inf')
    risk_minute = 0
    time_step = 60.0 # 60-second steps
    
    current_p1, current_v1 = pos1, vel1
    current_p2, current_v2 = pos2, vel2
    
    for minute in range(1, duration_mins + 1):
        # Propagate both satellites by one minute
        current_p1, current_v1 = propagate_step(current_p1, current_v1, time_step)
        current_p2, current_v2 = propagate_step(current_p2, current_v2, time_step)
        
        # Calculate how far apart they are
        dist = calculate_distance(current_p1, current_p2)
        
        if dist < min_distance:
            min_distance = dist
            risk_minute = minute
            
    has_collision_risk = min_distance <= threshold_km
    return has_collision_risk, min_distance, risk_minute

# --- Quick Test Block ---
if __name__ == "__main__":
    # Satellite 1: Celestiq-Alpha (from our CSV)
    alpha_pos = [6700.0, 0.0, 0.0]
    alpha_vel = [0.0, 7.67, 0.0]
    
    # Satellite 2: Enemy Debris (Intentionally placed on a crash trajectory)
    debris_pos = [6700.0, 100.0, 0.0]
    debris_vel = [0.0, 6.0, 0.0] 
    
    print("Running 90-minute conjunction screening...")
    
    is_risk, closest_approach, minute = detect_conjunction(
        alpha_pos, alpha_vel, debris_pos, debris_vel, duration_mins=90, threshold_km=5.0
    )
    
    print(f"Risk Detected: {is_risk}")
    print(f"Closest Approach: {closest_approach:.2f} km")
    print(f"Time to Impact: {minute} minutes")