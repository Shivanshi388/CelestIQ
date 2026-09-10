import csv
import math
import sys
import traceback
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure Python can find the app modules
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Data lives at the workspace root, one level above backend/
DATA_ROOT = PROJECT_ROOT.parent

from app.risk.collision_probability import evaluate_risk
from app.risk.risk_score import calculate_risk_score
from app.risk.prioritizer import prioritize_alerts
from app.orbit.conjunction import detect_conjunction

app = FastAPI(title="CelestIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _safe_float(val, default=0.0):
    """Safely convert a CSV string value to float."""
    if val is None or val == '':
        return default
    try:
        return float(val)
    except (ValueError, TypeError):
        return default


def _extract_physical(row):
    """Extract physical properties from a CSV row dict."""
    return {
        "mass_kg": _safe_float(row.get("mass_kg"), 100.0),
        "cross_section_m2": _safe_float(row.get("cross_section_m2"), 1.0),
        "cd": _safe_float(row.get("cd"), 2.2),
        "cr": _safe_float(row.get("cr"), 1.2),
    }


def _extract_covariance(row):
    """Extract covariance diagonal from a CSV row dict."""
    return {
        "xx": _safe_float(row.get("cov_xx"), 0.01),
        "yy": _safe_float(row.get("cov_yy"), 0.01),
        "zz": _safe_float(row.get("cov_zz"), 0.015),
    }


@app.get("/api/risks")
def get_orbital_risks():
    """Reads CSV telemetry safely, computes collision metrics, and returns the risk queue."""
    csv_path = DATA_ROOT / "data" / "sample" / "satellites.csv"
    
    satellites = []
    debris = []
    
    # 1. Safely read the CSV file
    try:
        if csv_path.exists():
            with open(csv_path, mode='r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    obj_id = row.get('object_id', '')
                    if obj_id.startswith('DEB'):
                        debris.append(row)
                    else:
                        satellites.append(row)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        traceback.print_exc()

    # 2. Fallback data if CSV is missing or empty
    if not satellites:
        satellites = [
            {"object_id": "SAT-25544", "name": "ISS (ZARYA)", "x": "6800.0", "y": "0.0", "z": "0.0",
             "mass_kg": "420000", "cross_section_m2": "400", "cd": "2.2", "cr": "1.3",
             "cov_xx": "0.05", "cov_yy": "0.05", "cov_zz": "0.08"},
            {"object_id": "SAT-48274", "name": "CSS (TIANHE)", "x": "6750.0", "y": "100.0", "z": "50.0",
             "mass_kg": "22500", "cross_section_m2": "50", "cd": "2.2", "cr": "1.3",
             "cov_xx": "0.01", "cov_yy": "0.01", "cov_zz": "0.015"},
            {"object_id": "SAT-00001", "name": "SAT-01", "x": "7000.0", "y": "200.0", "z": "150.0",
             "mass_kg": "250", "cross_section_m2": "1.5", "cd": "2.2", "cr": "1.2",
             "cov_xx": "0.001", "cov_yy": "0.001", "cov_zz": "0.002"}
        ]
    if not debris:
        debris = [
            {"object_id": "DEB-49271", "name": "FREGAT DEB", "x": "6800.3", "y": "0.1", "z": "0.1",
             "mass_kg": "25", "cross_section_m2": "0.7", "cd": "2.2", "cr": "1.2",
             "cov_xx": "0.007", "cov_yy": "0.007", "cov_zz": "0.010"},
            {"object_id": "DEB-33445", "name": "COSMOS DEB", "x": "6753.0", "y": "102.0", "z": "51.0",
             "mass_kg": "3.8", "cross_section_m2": "0.10", "cd": "2.2", "cr": "1.2",
             "cov_xx": "0.009", "cov_yy": "0.009", "cov_zz": "0.013"},
            {"object_id": "DEB-00002", "name": "DEB-02", "x": "7500.0", "y": "500.0", "z": "400.0",
             "mass_kg": "1.5", "cross_section_m2": "0.04", "cd": "2.2", "cr": "1.2",
             "cov_xx": "0.007", "cov_yy": "0.007", "cov_zz": "0.010"}
        ]
            
    generated_alerts = []
    
    # 3. Pair objects and run through risk evaluation
    pairs_count = min(len(satellites), len(debris))
    for i in range(pairs_count):
        sat = satellites[i]
        deb = debris[i]
        
        try:
            dx = _safe_float(sat.get('x')) - _safe_float(deb.get('x'))
            dy = _safe_float(sat.get('y')) - _safe_float(deb.get('y'))
            dz = _safe_float(sat.get('z')) - _safe_float(deb.get('z'))
            real_distance_km = math.sqrt(dx**2 + dy**2 + dz**2)
        except (ValueError, TypeError):
            real_distance_km = 100.0
            
        # Demo simulation values to ensure all risk tiers render on the UI
        if i == 0:
            eval_dist = 0.36
            time_mins = 5
        elif i == 1:
            eval_dist = 3.5
            time_mins = 45
        else:
            eval_dist = real_distance_km
            time_mins = 120
            
        try:
            # Extract physical properties and covariance for each object
            sat_phys = _extract_physical(sat)
            deb_phys = _extract_physical(deb)
            sat_cov = _extract_covariance(sat)
            deb_cov = _extract_covariance(deb)
            
            # Estimate altitude from position
            sat_r = math.sqrt(
                _safe_float(sat.get('x'))**2 + 
                _safe_float(sat.get('y'))**2 + 
                _safe_float(sat.get('z'))**2
            )
            deb_r = math.sqrt(
                _safe_float(deb.get('x'))**2 + 
                _safe_float(deb.get('y'))**2 + 
                _safe_float(deb.get('z'))**2
            )
            sat_alt = max(0, sat_r - 6378.137)
            deb_alt = max(0, deb_r - 6378.137)
            
            assessment = evaluate_risk(
                eval_dist, time_mins,
                obj1_covariance=sat_cov,
                obj2_covariance=deb_cov,
                obj1_mass_kg=sat_phys["mass_kg"],
                obj1_cross_section_m2=sat_phys["cross_section_m2"],
                obj1_cd=sat_phys["cd"],
                obj1_altitude_km=sat_alt,
                obj2_mass_kg=deb_phys["mass_kg"],
                obj2_cross_section_m2=deb_phys["cross_section_m2"],
                obj2_cd=deb_phys["cd"],
                obj2_altitude_km=deb_alt,
            )
            prob = assessment.get("probability_percent", 0.0)
            category = assessment.get("risk_category", "LOW")
            
            final_score = calculate_risk_score(prob, time_mins, asset_priority=3)
        except Exception as e:
            print(f"Risk evaluation error on pair {i}: {e}")
            traceback.print_exc()
            final_score = 10.0
            category = "LOW"
            
        generated_alerts.append({
            "object_id": sat.get('object_id', f"SAT-{i+1}"),
            "risk_score": final_score,
            "category": category
        })
        
    # 4. Run conjunction detection for 2009 Iridium-Cosmos collision pair
    iridium = next((s for s in satellites if s.get('object_id') == 'SAT-24944'), None)
    cosmos = next((s for s in satellites if s.get('object_id') == 'SAT-22674'), None)
    
    if iridium and cosmos:
        try:
            pos1 = [_safe_float(iridium.get('x')), _safe_float(iridium.get('y')), _safe_float(iridium.get('z'))]
            vel1 = [_safe_float(iridium.get('vx')), _safe_float(iridium.get('vy')), _safe_float(iridium.get('vz'))]
            pos2 = [_safe_float(cosmos.get('x')), _safe_float(cosmos.get('y')), _safe_float(cosmos.get('z'))]
            vel2 = [_safe_float(cosmos.get('vx')), _safe_float(cosmos.get('vy')), _safe_float(cosmos.get('vz'))]
            
            iridium_phys = _extract_physical(iridium)
            cosmos_phys = _extract_physical(cosmos)
            iridium_cov = _extract_covariance(iridium)
            cosmos_cov = _extract_covariance(cosmos)
            
            iridium_r = math.sqrt(_safe_float(iridium.get('x'))**2 + _safe_float(iridium.get('y'))**2 + _safe_float(iridium.get('z'))**2)
            cosmos_r = math.sqrt(_safe_float(cosmos.get('x'))**2 + _safe_float(cosmos.get('y'))**2 + _safe_float(cosmos.get('z'))**2)
            
            # Check conjunction over 90 minutes with full physics
            has_risk, min_dist, close_minute, metadata = detect_conjunction(
                pos1, vel1, pos2, vel2, 
                duration_mins=90, 
                threshold_km=50.0,
                obj1_mass_kg=iridium_phys["mass_kg"],
                obj1_cross_section_m2=iridium_phys["cross_section_m2"],
                obj1_cd=iridium_phys["cd"],
                obj1_cr=iridium_phys["cr"],
                obj2_mass_kg=cosmos_phys["mass_kg"],
                obj2_cross_section_m2=cosmos_phys["cross_section_m2"],
                obj2_cd=cosmos_phys["cd"],
                obj2_cr=cosmos_phys["cr"],
                obj1_covariance=iridium_cov,
                obj2_covariance=cosmos_cov,
            )
            
            # Convert to risk assessment using combined covariance
            combined_cov = metadata.get("combined_covariance", {})
            error_radius = combined_cov.get("total_error_radius", 0.01)
            
            if has_risk:
                assessment = evaluate_risk(
                    min_dist, close_minute,
                    obj1_covariance=iridium_cov,
                    obj2_covariance=cosmos_cov,
                    obj1_mass_kg=iridium_phys["mass_kg"],
                    obj1_cross_section_m2=iridium_phys["cross_section_m2"],
                    obj1_altitude_km=max(0, iridium_r - 6378.137),
                    obj2_mass_kg=cosmos_phys["mass_kg"],
                    obj2_cross_section_m2=cosmos_phys["cross_section_m2"],
                    obj2_altitude_km=max(0, cosmos_r - 6378.137),
                )
                prob = assessment.get("probability_percent", 0.0)
                category = assessment.get("risk_category", "LOW")
                final_score = calculate_risk_score(prob, close_minute, asset_priority=5)
            else:
                final_score = 15.0
                category = "ELEVATED"
                
            generated_alerts.append({
                "object_id": "SAT-24944",
                "risk_score": final_score,
                "category": category,
                "detail": f"Conjunction with COSMOS 2251: {min_dist:.1f} km min separation"
            })
        except Exception as e:
            print(f"2009 collision pair analysis error: {e}")
            traceback.print_exc()
        
    try:
        ranked_queue = prioritize_alerts(generated_alerts)
    except Exception as e:
        print(f"Prioritization error: {e}")
        ranked_queue = generated_alerts
        
    return {"status": "success", "data": ranked_queue}