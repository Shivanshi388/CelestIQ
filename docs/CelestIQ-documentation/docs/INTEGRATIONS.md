# Integrations

Verified / Present
- Local CSV/JSON demo data (`data/`).

Planned / Recommended
- CelesTrak / Space‑Track ingestion (not currently implemented).
- External notification channels (email/Slack) — Not implemented.
# Integrations

## Current integrations

### Browser localStorage

**Purpose:** Persist prototype authentication state and user list.

**Method:** Web Storage API.

**Authentication:** None.

**Data exchanged:** Session markers, serialized user records.

**Failure handling:** Store operations are performed directly by the Zustand store; database initialization catches fetch errors.

### Static `db.json`

**Purpose:** Seed the prototype browser user database.

**Method:** `fetch('/db.json')`.

**Authentication:** None.

**Data exchanged:** User records.

## Planned integrations

External orbital-data providers are mentioned by the project concept, but no external provider integration is implemented in the inspected code.

The backend/API layer is also not implemented.

## Integration boundary recommendation

Keep provider-specific code inside service adapters and avoid embedding provider calls inside visualization/page components.
