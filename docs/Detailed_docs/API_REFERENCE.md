# API Reference (overview)

Note: This reference should be synchronised with `docs/API_CONTRACT.md` and the implementations under `backend/app/api/`.

Example: `GET /health`
- Method: `GET`
- Path: `/health`
- Description: Check backend availability.
- Auth: Not required (unless implemented).
- Response: `{ "status": "ok" }` (example)

Example: `POST /manoeuvres/generate`
- Method: `POST`
- Path: `/manoeuvres/generate`
- Description: Generate candidate manoeuvres for a selected conjunction.
- Body: See `docs/API_CONTRACT.md`.
- Response: list of candidate objects with `delta_v`, `predicted_miss_distance`, `estimated_risk_reduction`.
- Implementation status: Partial — verify `backend/app/api/manoeuvres.py` for the exact signature.

Action: I can extract exact route signatures and generate detailed reference if you allow me to read `backend/app/api/*.py`.
# API Reference

## Current endpoint inventory

There are **no implemented backend endpoints**.

The Python route files under `backend/app/api/` are present as placeholders but are empty in the inspected revision.

## Planned endpoint reference

The original project README proposes the following endpoints:

| Method | Endpoint | Status |
|---|---|---|
| GET | `/health` | Planned |
| GET | `/satellites` | Planned |
| GET | `/conjunctions` | Planned |
| GET | `/conjunctions/{id}` | Planned |
| GET | `/risk/{id}` | Planned |
| POST | `/manoeuvres/generate` | Planned |
| POST | `/manoeuvres/simulate` | Planned |
| POST | `/manoeuvres/optimise` | Planned |
| GET | `/reports/{id}` | Planned |

No request schemas, response schemas, status-code implementation, authentication middleware, or live base URL should be inferred from these names.

## Frontend API layer

The frontend contains:

```text
frontend/src/services/api/
├── alerts.api.ts
├── client.ts
├── dashboard.api.ts
├── maneuvers.api.ts
└── satellites.api.ts
```

The inspected `client.ts` is empty, so these files should not be treated as evidence of a live API integration without further implementation.
