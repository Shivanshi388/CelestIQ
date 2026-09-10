import math
from typing import List, Tuple, Dict, Optional

# Earth's standard gravitational parameter (km^3/s^2)
MU = 398600.4418

# Earth's equatorial radius (km)
R_EARTH = 6378.137

# Atmospheric density at reference altitude (kg/m^3) and scale height (km)
# Using exponential atmosphere model for LEO drag
RHO_0 = 1.225  # sea level density
H_SCALE = 8.5  # scale height in km (typical for 200-600 km)

# Solar radiation pressure at 1 AU (N/m^2)
SRP_1AU = 4.56e-6

# Speed of light (km/s)
C_KM_S = 299792.458

# Astronomical Unit (km)
AU_KM = 149597870.7


def calculate_gravity_acceleration(position: List[float]) -> List[float]:
    """Calculates the 3D acceleration vector due to Earth's gravity (J2-less)."""
    x, y, z = position
    r_mag = math.sqrt(x**2 + y**2 + z**2)
    coeff = -MU / (r_mag**3)
    return [coeff * x, coeff * y, coeff * z]


def calculate_drag_acceleration(
    position: List[float],
    velocity: List[float],
    mass_kg: float,
    cross_section_m2: float,
    cd: float,
) -> List[float]:
    """
    Calculates atmospheric drag acceleration in ECI frame.
    Uses exponential atmosphere model: rho = rho_0 * exp(-(r - R_earth) / H_scale)
    Drag force: F_drag = -0.5 * rho * Cd * A * v_rel^2 * v_hat
    """
    r_mag = math.sqrt(position[0]**2 + position[1]**2 + position[2]**2)
    
    # Atmospheric density at current altitude
    altitude_km = r_mag - R_EARTH
    if altitude_km < 0:
        return [0.0, 0.0, 0.0]  # below surface
    
    rho = RHO_0 * math.exp(-altitude_km / H_SCALE)
    
    # Simplified: assume zero wind in ECI, so relative velocity = satellite velocity
    v_mag = math.sqrt(velocity[0]**2 + velocity[1]**2 + velocity[2]**2)
    
    if v_mag == 0 or rho < 1e-15:
        return [0.0, 0.0, 0.0]
    
    # Drag deceleration magnitude (m/s^2 converted to km/s^2)
    # F/m = -0.5 * rho * Cd * A * v^2 / m  (in m/s^2)
    # Convert to km/s^2 by dividing by 1000
    drag_mag = 0.5 * rho * cd * cross_section_m2 * v_mag**2 / mass_kg / 1000.0
    
    # Direction opposite to velocity
    accel = [-drag_mag * velocity[i] / v_mag for i in range(3)]
    return accel


def calculate_srp_acceleration(
    position: List[float],
    cr: float,
    cross_section_m2: float,
    mass_kg: float,
) -> List[float]:
    """
    Calculates solar radiation pressure acceleration in ECI frame.
    Simplified: Sun direction assumed fixed (good for short propagation arcs).
    For short-arc screening, we approximate Sun direction as constant.
    """
    r_mag = math.sqrt(position[0]**2 + position[1]**2 + position[2]**2)
    
    # Distance from Sun in AU (simplified: assume Sun is far away)
    # For LEO objects, the SRP acceleration is small but non-negligible for uncertainty
    r_au = r_mag / AU_KM
    
    # SRP pressure at object's distance
    srp_pressure = SRP_1AU / (r_au**2) if r_au > 0 else 0
    
    # SRP acceleration magnitude (m/s^2 converted to km/s^2)
    # F/m = Cr * A * Psun / m
    srp_mag = cr * cross_section_m2 * srp_pressure / mass_kg / 1000.0
    
    # Direction: away from Sun (simplified as radial for short arcs)
    # In reality this should be the sun vector, but for LEO screening
    # the radial approximation captures the dominant effect
    if r_mag == 0:
        return [0.0, 0.0, 0.0]
    
    accel = [srp_mag * position[i] / r_mag for i in range(3)]
    return accel


def calculate_acceleration(
    position: List[float],
    velocity: List[float],
    mass_kg: float = 100.0,
    cross_section_m2: float = 1.0,
    cd: float = 2.2,
    cr: float = 1.2,
) -> List[float]:
    """
    Total acceleration: gravity + drag + SRP.
    For high-fidelity screening, all three perturbations are included.
    """
    a_grav = calculate_gravity_acceleration(position)
    a_drag = calculate_drag_acceleration(position, velocity, mass_kg, cross_section_m2, cd)
    a_srp = calculate_srp_acceleration(position, cr, cross_section_m2, mass_kg)
    
    return [
        a_grav[0] + a_drag[0] + a_srp[0],
        a_grav[1] + a_drag[1] + a_srp[1],
        a_grav[2] + a_drag[2] + a_srp[2],
    ]


def propagate_step(
    position: List[float],
    velocity: List[float],
    dt_sec: float,
    mass_kg: float = 100.0,
    cross_section_m2: float = 1.0,
    cd: float = 2.2,
    cr: float = 1.2,
) -> Tuple[List[float], List[float]]:
    """Pushes the satellite forward using precise 4th-Order Runge-Kutta (RK4) integration
    with gravity + atmospheric drag + solar radiation pressure perturbations."""
    
    # Helper function to add/scale vectors
    def add_v(v1, v2, scale=1.0):
        return [a + b * scale for a, b in zip(v1, v2)]

    def acc(pos, vel):
        return calculate_acceleration(pos, vel, mass_kg, cross_section_m2, cd, cr)

    # k1: Initial state
    k1_v = acc(position, velocity)
    k1_r = velocity
    
    # k2: Midpoint 1
    pos_k2 = add_v(position, k1_r, dt_sec / 2.0)
    vel_k2 = add_v(velocity, k1_v, dt_sec / 2.0)
    k2_v = acc(pos_k2, vel_k2)
    k2_r = vel_k2
    
    # k3: Midpoint 2
    pos_k3 = add_v(position, k2_r, dt_sec / 2.0)
    vel_k3 = add_v(velocity, k2_v, dt_sec / 2.0)
    k3_v = acc(pos_k3, vel_k3)
    k3_r = vel_k3
    
    # k4: End state
    pos_k4 = add_v(position, k3_r, dt_sec)
    vel_k4 = add_v(velocity, k3_v, dt_sec)
    k4_v = acc(pos_k4, vel_k4)
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
    
    # Test with typical satellite properties
    test_mass = 560.0  # kg (like Iridium 33)
    test_area = 8.4    # m^2
    test_cd = 2.2
    test_cr = 1.3
    
    print("=== Gravity-Only Propagation ===")
    print("Initial Position:", start_pos)
    
    current_pos, current_vel = start_pos, start_vel
    for minute in range(1, 6):
        current_pos, current_vel = propagate_step(
            current_pos, current_vel, time_step,
            mass_kg=test_mass, cross_section_m2=test_area, cd=test_cd, cr=test_cr
        )
        
        clean_pos = [round(p, 2) for p in current_pos]
        r_mag = math.sqrt(sum(p**2 for p in current_pos))
        alt = r_mag - 6378.137
        print(f"Minute {minute} Pos: {clean_pos} | Alt: {alt:.2f} km")