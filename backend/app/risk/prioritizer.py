from typing import List, Dict

def prioritize_alerts(alerts: List[Dict]) -> List[Dict]:
    """
    Takes a list of alert dictionaries and sorts them by risk_score in descending order.
    The highest risk threats will be at index 0.
    """
    # Sort using a lambda function targeting the 'risk_score' key
    sorted_alerts = sorted(alerts, key=lambda x: x.get("risk_score", 0.0), reverse=True)
    return sorted_alerts

# --- Quick Test Block ---
if __name__ == "__main__":
    import sys
    from pathlib import Path
    
    # Resolve path for terminal execution
    PROJECT_ROOT = Path(__file__).resolve().parents[2]
    if str(PROJECT_ROOT) not in sys.path:
        sys.path.insert(0, str(PROJECT_ROOT))
        
    from app.risk.collision_probability import evaluate_risk
    from app.risk.risk_score import calculate_risk_score
    
    # Simulate scenarios for our new satellite IDs to match frontend severities
    scenarios = [
        {"object_id": "GEO-03", "miss_distance": 15.0, "time_to_impact_mins": 60, "priority": 5}, # Low risk
        {"object_id": "ORB-12", "miss_distance": 2.5, "time_to_impact_mins": 15, "priority": 3},  # Elevated risk
        {"object_id": "SAT-15", "miss_distance": 0.5, "time_to_impact_mins": 10, "priority": 4},  # Critical risk
        {"object_id": "SAT-07", "miss_distance": 0.1, "time_to_impact_mins": 5, "priority": 2},   # Critical risk
    ]
    
    alerts = []
    for s in scenarios:
        # 1. Evaluate Risk
        risk_eval = evaluate_risk(s["miss_distance"], s["time_to_impact_mins"])
        
        # 2. Calculate final Risk Score
        score = calculate_risk_score(
            risk_eval["probability_percent"], 
            s["time_to_impact_mins"], 
            asset_priority=s["priority"]
        )
        
        # 3. Compile alert object
        alert = {
            "object_id": s["object_id"],
            "risk_score": score,
            "category": risk_eval["risk_category"],
            "probability": risk_eval["probability_percent"],
            "action": risk_eval["recommended_action"]
        }
        alerts.append(alert)
        
    print("Unsorted Alerts:", [a["object_id"] for a in alerts])
    
    ranked = prioritize_alerts(alerts)
    
    print("\n--- PRIORITIZED QUEUE ---")
    for i, alert in enumerate(ranked):
        print(f"Rank {i+1}: {alert['object_id']} (Score: {alert['risk_score']} | Cat: {alert['category']} | Prob: {alert['probability']}%)")