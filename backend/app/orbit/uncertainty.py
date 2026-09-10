import math
from typing import List, Dict, Optional


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
    Uses baseline errors when no per-object covariance is available.
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


def propagate_covariance(
    initial_covariance: Dict[str, float],
    time_ahead_mins: int,
    mass_kg: float = 100.0,
    cross_section_m2: float = 1.0,
    cd: float = 2.2,
    altitude_km: float = 400.0,
) -> Dict[str, float]:
    """
    Propagates position covariance forward in time using linearized error growth.
    
    The covariance grows due to:
    1. Initial state uncertainty (from radar/tracking)
    2. Atmospheric drag uncertainty (dominant for LEO)
    3. Solar radiation pressure uncertainty
    
    Uses a simplified first-order propagation:
        P(t) = P(0) + (J * Q * J^T) * t
    
    where J is the state transition Jacobian and Q is the process noise.
    
    Args:
        initial_covariance: Dict with xx, yy, zz (diagonal covariance in km^2)
        time_ahead_mins: Prediction time horizon
        mass_kg: Object mass (affects drag uncertainty contribution)
        cross_section_m2: Cross-sectional area (affects drag uncertainty)
        cd: Drag coefficient
        altitude_km: Current altitude (affects atmospheric density)
    
    Returns:
        Dict with propagated sigma_x, sigma_y, sigma_z in km and total_error_radius
    """
    # Extract initial diagonal covariance elements
    cov_xx = initial_covariance.get("xx", 0.01)
    cov_yy = initial_covariance.get("yy", 0.01)
    cov_zz = initial_covariance.get("zz", 0.015)
    
    # Time in seconds for propagation
    t_sec = time_ahead_mins * 60.0
    
    # Process noise growth rates (km^2/min^2) based on perturbation uncertainty
    # Drag uncertainty dominates in LEO and grows with altitude-dependent density
    # Typical values: ~1e-6 to 1e-4 km^2/min^2 depending on altitude
    
    # Atmospheric density uncertainty factor (higher at lower altitudes)
    rho_uncertainty = 0.15  # 15% density model uncertainty
    
    # Drag process noise: scales with (Cd * A / m) and density uncertainty
    drag_factor = cd * cross_section_m2 / mass_kg
    # Convert to appropriate units (km^2/min^2)
    drag_noise_rate = rho_uncertainty * drag_factor * 1e-8  # empirical scaling
    
    # SRP process noise: smaller, ~1% of drag noise
    srp_noise_rate = drag_noise_rate * 0.01
    
    # Total process noise rate (km^2 per minute)
    process_noise_per_min = drag_noise_rate + srp_noise_rate
    
    # Propagate covariance: P(t) = P(0) + Q * t (linear growth for short arcs)
    propagated_xx = cov_xx + process_noise_per_min * time_ahead_mins
    propagated_yy = cov_yy + process_noise_per_min * time_ahead_mins
    propagated_zz = cov_zz + process_noise_per_min * time_ahead_mins
    
    # Convert variance to standard deviation (sigma)
    sigma_x = math.sqrt(max(propagated_xx, 0.001))
    sigma_y = math.sqrt(max(propagated_yy, 0.001))
    sigma_z = math.sqrt(max(propagated_zz, 0.001))
    
    return {
        "sigma_x_km": round(sigma_x, 4),
        "sigma_y_km": round(sigma_y, 4),
        "sigma_z_km": round(sigma_z, 4),
        "total_error_radius": round(math.sqrt(sigma_x**2 + sigma_y**2 + sigma_z**2), 4),
        "propagated_covariance": {
            "xx": round(propagated_xx, 6),
            "yy": round(propagated_yy, 6),
            "zz": round(propagated_zz, 6),
        }
    }


def compute_combined_covariance(
    cov1: Dict[str, float],
    cov2: Dict[str, float],
) -> Dict[str, float]:
    """
    Computes the combined covariance matrix for two objects at conjunction.
    For the miss distance calculation, we need the relative covariance:
        P_combined = P1 + P2
    
    Args:
        cov1: First object's covariance (xx, yy, zz diagonal)
        cov2: Second object's covariance (xx, yy, zz diagonal)
    
    Returns:
        Combined covariance with sigma values and total error radius
    """
    combined_xx = cov1.get("xx", 0.01) + cov2.get("xx", 0.01)
    combined_yy = cov1.get("yy", 0.01) + cov2.get("yy", 0.01)
    combined_zz = cov1.get("zz", 0.015) + cov2.get("zz", 0.015)
    
    sigma_x = math.sqrt(combined_xx)
    sigma_y = math.sqrt(combined_yy)
    sigma_z = math.sqrt(combined_zz)
    
    return {
        "sigma_x_km": round(sigma_x, 4),
        "sigma_y_km": round(sigma_y, 4),
        "sigma_z_km": round(sigma_z, 4),
        "total_error_radius": round(math.sqrt(sigma_x**2 + sigma_y**2 + sigma_z**2), 4),
        "combined_covariance": {
            "xx": round(combined_xx, 6),
            "yy": round(combined_yy, 6),
            "zz": round(combined_zz, 6),
        }
    }


# --- Quick Test Block ---
if __name__ == "__main__":
    print("=== Baseline Error Ellipsoid Growth ===")
    for minute in [0, 30, 60, 90]:
        ellipsoid = generate_error_ellipsoid(time_ahead_mins=minute)
        print(f"T+{minute} mins -> Total Error Radius: {ellipsoid['total_error_radius']} km")
    
    print("\n=== Covariance Propagation (Iridium 33-like object) ===")
    initial_cov = {"xx": 0.002, "yy": 0.002, "zz": 0.003}
    for minute in [0, 15, 30, 60, 90]:
        propagated = propagate_covariance(
            initial_cov, minute,
            mass_kg=560.0, cross_section_m2=8.4, cd=2.2, altitude_km=780.0
        )
        print(f"T+{minute} mins -> Sigma: ({propagated['sigma_x_km']:.3f}, {propagated['sigma_y_km']:.3f}, {propagated['sigma_z_km']:.3f}) km | Total: {propagated['total_error_radius']:.3f} km")
    
    print("\n=== Combined Covariance at Conjunction ===")
    cov_iridium = {"xx": 0.003, "yy": 0.003, "zz": 0.004}
    cov_cosmos = {"xx": 0.004, "yy": 0.004, "zz": 0.005}
    combined = compute_combined_covariance(cov_iridium, cov_cosmos)
    print(f"Combined Sigma: ({combined['sigma_x_km']:.3f}, {combined['sigma_y_km']:.3f}, {combined['sigma_z_km']:.3f}) km")
    print(f"Total Error Radius: {combined['total_error_radius']:.3f} km")