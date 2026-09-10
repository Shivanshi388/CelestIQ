from typing import List, Dict, Any, Optional

def parse_records(raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Parses raw string dictionaries from the CSV into proper data types.
    Converts coordinates (x,y,z) and velocities (vx,vy,vz) to floats.
    Also parses physical properties and covariance if present.
    """
    parsed_data = []
    
    for row in raw_data:
        try:
            parsed_row = {
                "object_id": row["object_id"],
                "name": row["name"],
                "epoch": row["epoch"], # We will keep this as a string for now until normalizer.py
                "position": [
                    float(row["x"]), 
                    float(row["y"]), 
                    float(row["z"])
                ],
                "velocity": [
                    float(row["vx"]), 
                    float(row["vy"]), 
                    float(row["vz"])
                ],
                # Physical properties for drag/SRP perturbation modeling
                "mass_kg": _safe_float(row.get("mass_kg"), 100.0),
                "cross_section_m2": _safe_float(row.get("cross_section_m2"), 1.0),
                "cd": _safe_float(row.get("cd"), 2.2),
                "cr": _safe_float(row.get("cr"), 1.2),
                # Position covariance (diagonal elements)
                "covariance": {
                    "xx": _safe_float(row.get("cov_xx"), 0.01),
                    "yy": _safe_float(row.get("cov_yy"), 0.01),
                    "zz": _safe_float(row.get("cov_zz"), 0.015),
                },
            }
            parsed_data.append(parsed_row)
        except (KeyError, ValueError) as e:
            print(f"Skipping invalid row {row.get('object_id', 'Unknown')}: {e}")
            continue
            
    return parsed_data


def _safe_float(value: Optional[str], default: float) -> float:
    """Safely convert a string to float, returning default if empty or invalid."""
    if value is None or value == '':
        return default
    try:
        return float(value)
    except (ValueError, TypeError):
        return default