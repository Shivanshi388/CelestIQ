def calculate_risk_score(
    probability_percent: float, 
    time_to_impact_mins: int, 
    asset_priority: int = 3
) -> float:
    """
    Calculates a final Threat Score (0 to 100).
    asset_priority: 1 (Expendable) to 5 (Critical Infrastructure). Default is 3.
    """
    # Start with the raw probability percentage, scaled up because
    # the 10m hard-body math yields very small percentages (max ~0.004%)
    base_score = probability_percent * 25000
    
    # Time Multiplier: Emergencies under 15 minutes scale up the panic
    time_multiplier = 1.0
    if time_to_impact_mins <= 15:
        time_multiplier = 1.5
    elif time_to_impact_mins > 60:
        time_multiplier = 0.8
        
    # Asset Multiplier: Protect high-value targets
    asset_multiplier = asset_priority / 3.0 
    
    final_score = base_score * time_multiplier * asset_multiplier
    
    # Cap the maximum score at 100
    return min(round(final_score, 2), 100.0)

# --- Quick Test Block ---
if __name__ == "__main__":
    pc = 95.23
    impact_time = 1
    
    score = calculate_risk_score(pc, impact_time, asset_priority=5)
    print(f"Input: {pc}% PC, {impact_time} min to impact, Priority 5")
    print(f"Final Risk Score: {score} / 100")