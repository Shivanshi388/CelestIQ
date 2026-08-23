# API Contract (Planned)

This document summarises the planned API request and response contracts for CelestIQ. The backend implementation is currently not present in this repository; these contracts should be treated as the authoritative interface specification once the backend is implemented.

Health
`GET /health`
  - Response: `{ "status": "ok", "time": "2026-08-23T...Z" }`

Satellites
`GET /satellites`
  - Response: array of satellite objects `{ id, name, owner, last_state }`

Conjunctions
`GET /conjunctions`
  - Response: array of conjunction summaries `{ id, primary_id, secondary_id, tca, miss_distance, risk_score }`
`GET /conjunctions/{id}`
  - Response: detailed conjunction record with uncertainty and encounter timeline.

Risk
`GET /risk/{id}`
  - Response: risk analysis summary for a conjunction or object.

Manoeuvres
`POST /manoeuvres/generate`
  - Body: `{ "conjunction_id": "...", "constraints": { ... } }`
  - Response: list of candidate manoeuvres `{ id, delta_v, burn_time, predicted_miss_distance, estimated_risk_reduction }`
`POST /manoeuvres/simulate`
  - Body: candidate manoeuvre spec
  - Response: simulation trace and post-manoeuvre risk.
`POST /manoeuvres/optimise`
  - Body: set of candidates or optimization parameters
  - Response: ranked feasible candidate list and recommended option.

Reports
`GET /reports/{id}`
  - Response: PDF/JSON report for a conjunction or manoeuvre recommendation.

Notes
- Exact JSON schemas and validation rules must be extracted from the backend implementation (`backend/app/api/*`) when implemented.
- Authentication and authorization are Not implemented in the current codebase; add security requirements when implementing these endpoints.
