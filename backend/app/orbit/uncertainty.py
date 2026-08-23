import math
from typing import List, Dict

def calculate_positional_error(base_error_km: float, time_ahead_mins: int, drift_rate: float = 0.05) -> float:
    """
    Calculates how much the positional error 'bubble' expands over time.
    base_error_km: The initial radar sensor inaccuracy.
    drift_rate: How much the error grows per minute of prediction.
    """
    # The error grows linearly the further into the future we predict
    expanded_error = base_error_km + (drift_rate * time_ahead_mins)
    return expanded_error

def generate_error_ellipsoid(time_ahead_mins: int) -> Dict[str, float]:
    """
    Generates the standard deviation (sigma) of the position in 3D space.
    Returns the error margins in the X, Y, and Z directions.
    """
    # Assuming baseline radar errors (e.g., radar is better at measuring distance than altitude)
    base_error_x = 0.5  # 500 meters
    base_error_y = 0.5  
    base_error_z = 0.8  # 800 meters

    sigma_x = calculate_positional_error(base_error_x, time_ahead_mins)
    sigma_y = calculate_positional_error(base_error_y, time_ahead_mins)
    sigma_z = calculate_positional_error(base_error_z, time_ahead_mins)

    return {
        "sigma_x_km": round(sigma_x, 3),
        "sigma_y_km": round(sigma_y, 3),
        "sigma_z_km": round(sigma_z, 3),
        "total_error_radius": round(math.sqrt(sigma_x**2 + sigma_y**2 + sigma_z**2), 3)
    }

# --- Quick Test Block ---
if __name__ == "__main__":
    print("Testing Uncertainty Growth Over Time:")
    for minute in [0, 30, 60, 90]:
        ellipsoid = generate_error_ellipsoid(time_ahead_mins=minute)
        print(f"T+{minute} mins -> Total Error Radius: {ellipsoid['total_error_radius']} km")