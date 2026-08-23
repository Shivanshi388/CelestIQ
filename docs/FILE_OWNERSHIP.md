# File Ownership Map

This map describes responsibility boundaries, not enforced CODEOWNERS rules. The repository does not currently include a CI or review policy that enforces ownership.

| Area | Primary responsibility | Review focus |
|---|---|---|
| `frontend/src/app/` | Application composition and route gating | Session flow, route regressions |
| `frontend/src/components/` | Shared shell, dashboard, and UI primitives | Accessibility, responsive layout |
| `frontend/src/features/` | Domain-facing alerts, dashboard, auth, manoeuvres, visualization | State contracts and user workflow |
| `frontend/src/services/` | Mock data and future API adapters | Provenance, transport boundaries |
| `frontend/src/store/` | Zustand cross-feature state | Persistence and state transitions |
| `frontend/src/styles/` | Tokens, global styling, animation rules | Contrast, motion preferences |
| `backend/app/data/` | Ingestion and normalization | Schema, units, malformed input |
| `backend/app/orbit/`, `risk/`, `manoeuvre/` | Future analytical engines | Scientific validation and tests |
| `database/` | Future persistence artifacts | Migrations, constraints, backups |
| `docs/` | Product and engineering truth | Status labels and source links |

Changes that affect risk, manoeuvre recommendations, authentication, or provenance require domain review before being presented as operational capability.
