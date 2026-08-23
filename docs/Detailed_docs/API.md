# API Overview

Status
- The repo contains an API scaffold under `backend/app/api/`. Planned endpoints are listed in the top-level README and in `docs/API_CONTRACT.md`.

Conventions
- RESTful JSON endpoints.
- FastAPI‑compatible structure expected (`backend/app/main.py`).

Planned endpoints (from README and `backend/app/api/`):
- `GET /health`
- `GET /satellites`
- `GET /conjunctions`
- `GET /conjunctions/{id}`
- `GET /risk/{id}`
- `POST /manoeuvres/generate`
- `POST /manoeuvres/simulate`
- `POST /manoeuvres/optimise`
- `GET /reports/{id}`

Authentication: Not implemented in audited codebase — see `docs/AUTHENTICATION.md`.

For full request/response contracts, consult `docs/API_CONTRACT.md` and the `backend/app/api/` source files.
# API

## Current status

**Not implemented.**

The repository contains a planned Python API structure and frontend API-service directory, but there is no active backend endpoint implementation in the inspected revision.

## Planned API boundary

The original project design proposes endpoints for:

- Health.
- Satellites.
- Conjunctions.
- Risk.
- Manoeuvres.
- Reports.

These are documented as **planned**, not available services.

## Current frontend data access

The current frontend primarily uses mock TypeScript services. The authentication store reads `public/db.json` directly and stores user/session data in localStorage.

## Authentication

There is no HTTP authentication mechanism currently implemented.

## Response format

No backend response contract is currently implemented.

## Versioning

No API versioning scheme is currently implemented.

## Rate limiting

Not implemented.

## Future migration principle

The mock service interfaces should remain behind the `services` layer so a future HTTP implementation can replace them without coupling UI components directly to fetch/HTTP details.
