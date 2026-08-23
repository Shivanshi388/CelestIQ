import csv
from pathlib import Path
from typing import List, Dict, Any

def load_orbital_data(file_path: str) -> List[Dict[str, Any]]:
    """Loads orbital state vectors from a CSV file into a list of dictionaries."""
    data = []
    # Using pathlib ensures seamless file path handling across different operating systems
    path = Path(file_path)
    
    if not path.exists():
        raise FileNotFoundError(f"Data file not found: {file_path}")
        
    with open(path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # We will handle type conversion (strings to floats) in the parser module later
            data.append(row)
            
    return data

# --- Quick Test Block ---
if __name__ == "__main__":
    import sys
    from pathlib import Path
    
    # Ensure the project root is in sys.path when running this script directly
    project_root = Path(__file__).resolve().parents[2]
    if str(project_root) not in sys.path:
        sys.path.insert(0, str(project_root))
        
    from app.data.parser import parse_records
    from app.data.validator import validate_records
        
    # Use absolute path for test data so it works regardless of the current working directory
    test_path = str(project_root.parent / "data" / "sample" / "satellites.csv") 
    try:
        raw_records = load_orbital_data(test_path)
        print(f"Loaded {len(raw_records)} raw records.")
        
        # Pass the raw data into the parser
        clean_records = parse_records(raw_records)
        print("Parsed Record:")
        print(clean_records[0])
        
        # Pass the parsed data into the validator
        print("\nRunning physics validation...")
        valid_records = validate_records(clean_records)
        print(f"Success! {len(valid_records)} records passed validation.")
        print("Final Record:")
        print(valid_records[0])
        
    except FileNotFoundError as e:
        print(e)