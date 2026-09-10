import csv
from pathlib import Path
from skyfield.api import load

def fetch_live_data():
    # 1. CelesTrak API endpoints for Active Satellites and Space Debris
    active_url = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle'
    debris_url = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=cosmos-2251-debris&FORMAT=tle'
    
    print("Connecting to CelesTrak...")
    
    # Load both TLE sets
    print("Fetching active satellites...")
    active_sats = load.tle_file(active_url)
    
    print("Fetching debris cloud...")
    debris_objs = load.tle_file(debris_url)
    
    print(f"Downloaded {len(active_sats)} active satellites and {len(debris_objs)} debris fragments.")
    
    # 2. Get the exact current timestamp to calculate live positions
    ts = load.timescale()
    t = ts.now()
    
    # CSV lives at the workspace root, one level above backend/
    workspace_root = Path(__file__).resolve().parent.parent
    csv_path = workspace_root / "data" / "sample" / "satellites.csv"
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    
    # 3. We will grab 12 Active Satellites (including Iridium 33 & Cosmos 2251) 
    #    and 10 Debris fragments from the 2009 Iridium-Cosmos collision
    #    to keep the UI clean but realistic
    test_batch = active_sats[:12] + debris_objs[:10]
    
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['object_id', 'name', 'epoch', 'x', 'y', 'z', 'vx', 'vy', 'vz'])
        
        for sat in test_batch: 
            geocentric = sat.at(t)
            pos = geocentric.position.km
            vel = geocentric.velocity.km_per_s
            
            # Label debris vs active satellites for your frontend to display
            prefix = "DEB" if sat in debris_objs else "SAT"
            
            writer.writerow([
                f"{prefix}-{sat.model.satnum}",
                sat.name.strip(),
                t.utc_iso(),
                round(pos[0], 2), round(pos[1], 2), round(pos[2], 2),
                round(vel[0], 2), round(vel[1], 2), round(vel[2], 2)
            ])

    print(f"Saved {len(test_batch)} real-world objects to: {csv_path}")

if __name__ == "__main__":
    fetch_live_data()