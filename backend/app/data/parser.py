from typing import List, Dict, Any

def parse_records(raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Parses raw string dictionaries from the CSV into proper data types.
    Converts coordinates (x,y,z) and velocities (vx,vy,vz) to floats.
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
                ]
            }
            parsed_data.append(parsed_row)
        except (KeyError, ValueError) as e:
            print(f"Skipping invalid row {row.get('object_id', 'Unknown')}: {e}")
            continue
            
    return parsed_data