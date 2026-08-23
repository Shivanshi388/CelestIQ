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
    mock_alerts = [
        {"object_id": "DEB-992", "risk_score": 45.2, "category": "ELEVATED"},
        {"object_id": "SAT-001", "risk_score": 100.0, "category": "CRITICAL"},
        {"object_id": "ORB-12", "risk_score": 12.5, "category": "LOW"}
    ]
    
    print("Unsorted Alerts:", [a["object_id"] for a in mock_alerts])
    
    ranked = prioritize_alerts(mock_alerts)
    
    print("\n--- PRIORITIZED QUEUE ---")
    for i, alert in enumerate(ranked):
        print(f"Rank {i+1}: {alert['object_id']} (Score: {alert['risk_score']})")