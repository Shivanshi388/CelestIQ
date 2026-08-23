import math
from typing import List, Dict, Any

def validate_records(parsed_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Validates parsed orbital records for physical realism.
    Filters out records with impossible coordinates or velocities.
    """
    valid_data = []
    EARTH_RADIUS_KM = 6371.0
    
    for row in parsed_data:
        pos = row["position"]
        vel = row["velocity"]
        
        # Calculate magnitudes using the 3D distance formula
        r_mag = math.sqrt(pos[0]**2 + pos[1]**2 + pos[2]**2)
        v_mag = math.sqrt(vel[0]**2 + vel[1]**2 + vel[2]**2)
        
        is_valid = True
        
        # Physics Check 1: Is the satellite inside the Earth?
        if r_mag < EARTH_RADIUS_KM:
            print(f"Validation failed for {row['object_id']}: Distance ({r_mag:.1f} km) is below Earth's surface.")
            is_valid = False
            
        # Physics Check 2: Is the velocity physically reasonable?
        if v_mag < 1.0 or v_mag > 15.0:
            print(f"Validation failed for {row['object_id']}: Velocity ({v_mag:.2f} km/s) is out of bounds.")
            is_valid = False
            
        if is_valid:
            valid_data.append(row)
            
    return valid_data