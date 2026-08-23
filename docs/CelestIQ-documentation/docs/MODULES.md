# Modules

Mapping to repository:
- `backend/app/data/` — ingestion, parser, validator, normalizer.
- `backend/app/orbit/` — propagation, conjunction, uncertainty.
- `backend/app/risk/` — collision_probability.py, risk_score.py, prioritizer.py.
- `backend/app/manoeuvre/` — generator, simulator, constraints, optimizer.
- `backend/app/api/` — endpoints for health, satellites, conjunctions, manoeuvres.
- `backend/app/services/` — decision_support.py, alert_service.py, report_generator.py.
# Modules

## Frontend modules

| Module | Responsibility | Status |
|---|---|---|
| `app` | Application composition/routing | Implemented |
| `components` | Reusable UI/layout | Implemented |
| `context` | Theme provider | Implemented |
| `features/alerts` | Alert feature | Implemented |
| `features/auth` | Auth feature structure | Implemented structurally |
| `features/dashboard` | Dashboard feature | Implemented |
| `features/maneuvers` | Manoeuvre feature | Implemented |
| `features/visualization` | Orbital visualization | Implemented |
| `pages` | Route-level views | Implemented |
| `services/mock` | Prototype data providers | Implemented |
| `services/api` | Future API adapters | Scaffolded |
| `store` | Zustand state | Implemented |
| `types` | Shared TypeScript domain types | Implemented |
| `lib` | Constants/utilities/validators | Implemented |
| `styles` | CSS/theme/animation layers | Implemented |

## Backend modules

The following are scaffolded but not implemented:

- `api`
- `data`
- `orbit`
- `risk`
- `manoeuvre`
- `ml`
- `services`
- `utils`

The module names describe intended responsibilities and should not be documented as active business logic until implementation exists.
