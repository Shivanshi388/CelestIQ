from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from pathlib import Path

# Ensure Python can find the app modules
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.risk.collision_probability import evaluate_risk
from app.risk.risk_score import calculate_risk_score
from app.risk.prioritizer import prioritize_alerts

app = FastAPI(title="CelestIQ API")

# Allow the frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/risks")
def get_orbital_risks():
    """Runs the risk engine and serves the prioritized queue."""
    scenarios = [
        {"id": "SAT-15", "dist_km": 0.36, "time_mins": 1, "priority": 3},
        {"id": "GEO-03", "dist_km": 14.2, "time_mins": 85, "priority": 5},
        {"id": "ORB-12", "dist_km": 3.5, "time_mins": 45, "priority": 4},
        {"id": "SAT-07", "dist_km": 25.0, "time_mins": 120, "priority": 3}
    ]
    
    generated_alerts = []
    for s in scenarios:
        assessment = evaluate_risk(s["dist_km"], s["time_mins"])
        final_score = calculate_risk_score(
            assessment["probability_percent"], s["time_mins"], s["priority"]
        )
        generated_alerts.append({
            "object_id": s["id"],
            "risk_score": final_score,
            "category": assessment["risk_category"]
        })

    ranked_queue = prioritize_alerts(generated_alerts)
    return {"status": "success", "data": ranked_queue}