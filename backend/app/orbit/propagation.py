import math
from typing import List, Tuple

# Earth's standard gravitational parameter (km^3/s^2)
MU = 398600.4418

def calculate_acceleration(position: List[float]) -> List[float]:
    """Calculates the 3D acceleration vector due to Earth's gravity."""
    x, y, z = position
    r_mag = math.sqrt(x**2 + y**2 + z**2)
    coeff = -MU / (r_mag**3)
    return [coeff * x, coeff * y, coeff * z]

def propagate_step(position: List[float], velocity: List[float], dt_sec: float) -> Tuple[List[float], List[float]]:
    """Pushes the satellite forward using precise 4th-Order Runge-Kutta (RK4) integration."""
    
    # Helper function to add/scale vectors
    def add_v(v1, v2, scale=1.0):
        return [a + b * scale for a, b in zip(v1, v2)]

    # k1: Initial state
    k1_v = calculate_acceleration(position)
    k1_r = velocity
    
    # k2: Midpoint 1
    pos_k2 = add_v(position, k1_r, dt_sec / 2.0)
    vel_k2 = add_v(velocity, k1_v, dt_sec / 2.0)
    k2_v = calculate_acceleration(pos_k2)
    k2_r = vel_k2
    
    # k3: Midpoint 2
    pos_k3 = add_v(position, k2_r, dt_sec / 2.0)
    vel_k3 = add_v(velocity, k2_v, dt_sec / 2.0)
    k3_v = calculate_acceleration(pos_k3)
    k3_r = vel_k3
    
    # k4: End state
    pos_k4 = add_v(position, k3_r, dt_sec)
    vel_k4 = add_v(velocity, k3_v, dt_sec)
    k4_v = calculate_acceleration(pos_k4)
    k4_r = vel_k4
    
    new_pos = [0.0, 0.0, 0.0]
    new_vel = [0.0, 0.0, 0.0]
    
    # Combine the 4 samples using the RK4 weighted average
    for i in range(3):
        new_pos[i] = position[i] + (dt_sec / 6.0) * (k1_r[i] + 2*k2_r[i] + 2*k3_r[i] + k4_r[i])
        new_vel[i] = velocity[i] + (dt_sec / 6.0) * (k1_v[i] + 2*k2_v[i] + 2*k3_v[i] + k4_v[i])
        
    return new_pos, new_vel

# --- Quick Test Block ---
if __name__ == "__main__":
    start_pos = [6700.0, 0.0, 0.0]
    start_vel = [0.0, 7.67, 0.0]
    time_step = 60.0 
    
    print("Initial Position:", start_pos)
    
    current_pos, current_vel = start_pos, start_vel
    for minute in range(1, 6):
        current_pos, current_vel = propagate_step(current_pos, current_vel, time_step)
        
        clean_pos = [round(p, 2) for p in current_pos]
        r_mag = math.sqrt(sum(p**2 for p in current_pos))
        print(f"Minute {minute} Pos: {clean_pos} | Altitude (from center): {r_mag:.2f} km")