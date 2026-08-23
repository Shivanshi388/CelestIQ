# Functional Requirements

FR-001 — Data Ingestion
- Description: Load orbital and space‑object data from sample CSV/JSON into canonical internal format.
- Preconditions: `data/sample/` files present.
- Inputs: CSV/JSON (satellites.csv, space_objects.csv).
- Processing: Parsing, validation, normalization.
- Outputs: Normalized records ready for propagation.
- Error conditions: Malformed rows → record rejected with logged reason.
- Related modules: `backend/app/data/ingestion.py`, `backend/app/data/parser.py`, `backend/app/data/validator.py`.

FR-002 — Orbit Propagation
- Description: Propagate object states forward over a selected time window.
- Preconditions: Valid input states.
- Inputs: State vectors / orbital elements and propagation window.
- Processing: Numerical propagation (prototype).
- Outputs: Time‑series position estimates.
- Error conditions: Integration failure → error returned.
- Related modules: `backend/app/orbit/propagation.py`.

FR-003 — Conjunction Detection
- Description: Identify close approaches between objects within horizon window.
- Preconditions: Propagated positions available.
- Inputs: Propagated position time‑series.
- Processing: Closest‑approach search.
- Outputs: Conjunction records (time of closest approach, miss distance).
- Related modules: `backend/app/orbit/conjunction.py`.

FR-004 — Risk Scoring
- Description: Compute collision‑probability based risk score and categorise urgency.
- Preconditions: Conjunction record and uncertainty info.
- Inputs: Conjunction details, covariance (if available).
- Processing: Prototype PC calculation and composite risk score.
- Outputs: Numeric risk score and category (critical/high/monitor/low).
- Related modules: `backend/app/risk/collision_probability.py`, `backend/app/risk/risk_score.py`.

FR-005 — Manoeuvre Generation
- Description: Generate candidate avoidance manoeuvres.
- Preconditions: Conjunction requires evaluation.
- Inputs: Conjunction record, satellite constraints.
- Processing: Generate delta‑V options (along‑track, radial, cross‑track) and timings.
- Outputs: Candidate manoeuvres with ΔV estimates.
- Related modules: `backend/app/manoeuvre/generator.py`, `backend/app/manoeuvre/constraints.py`.

FR-006 — Manoeuvre Simulation & Optimisation
- Description: Simulate each candidate and produce a ranked, feasible recommendation.
- Preconditions: Generated candidate set.
- Inputs: Candidate manoeuvres.
- Processing: Simulate post‑manoeuvre propagation, compute residual risk, run optimizer.
- Outputs: Ranked candidate list, recommendation.
- Related modules: `backend/app/manoeuvre/simulator.py`, `backend/app/manoeuvre/optimizer.py`.

FR-007 — API Endpoints
- Description: Provide REST endpoints for health, satellites, conjunctions, risk and manoeuvres.
- Preconditions: Backend app running.
- Inputs: HTTP requests per `docs/API_CONTRACT.md`.
- Outputs: JSON responses.
- Files: `backend/app/api/*.py` (scaffolded).
- Implementation status: Partial / verify route signatures in code.

Notes
- All FR entries reflect existing modules or documented planned modules. If code behavior differs, update these entries to match source.
# Functional Requirements

The requirements below describe functionality that is actually observable in the current repository.

| ID | Requirement | Status |
|---|---|---|
| FR-001 | Authenticate a user through the login UI | Implemented |
| FR-002 | Create a new operator account locally | Implemented |
| FR-003 | Reset a user's password locally | Implemented |
| FR-004 | Continue as Guest | Implemented |
| FR-005 | Persist authentication state in browser storage | Implemented |
| FR-006 | Display dashboard content | Implemented |
| FR-007 | Display mission feed data | Implemented |
| FR-008 | Display alerts | Implemented |
| FR-009 | Restrict selected routes for Guest users | Implemented |
| FR-010 | Display 3D orbital visualization | Implemented |
| FR-011 | Display manoeuvre comparison information | Implemented |
| FR-012 | Provide backend conjunction API | Not implemented |
| FR-013 | Calculate operational collision probability | Not implemented |
| FR-014 | Generate real avoidance manoeuvres | Not implemented |
| FR-015 | Persist orbital/mission entities in SQL | Not implemented |

## FR-001 — Authentication

**Preconditions:** Browser has loaded the application.

**Inputs:** Username and password.

**Processing:** `useAuthStore.login()` finds a matching user in the browser-side user list and compares the stored encoded password with the encoded submitted password.

**Output:** Authenticated session state on success; an error string on failure.

**Error conditions:** Unknown username or incorrect password.

**Related modules:** `LoginPage.tsx`, `auth.store.ts`, `public/db.json`.

## FR-002 — Operator signup

**Inputs:** Username, password, full name.

**Processing:** Duplicate usernames are rejected; new users are stored in browser localStorage with role `Operator`.

**Output:** Authenticated session.

## FR-003 — Password reset

The current UI allows a username and new password to be submitted. The store updates the local user record without an email/identity verification flow.

This is a prototype behavior and is not production-safe.

## FR-004 — Guest access

Guest login creates an in-memory session with role `Guest` and stores the session markers in localStorage.

## FR-005 — Session persistence

The store initializes `isAuthenticated` from the presence of `sentinel_token` and restores the user from `sentinel_user`.

## FR-006/007 — Dashboard and mission feed

The dashboard composes overview information, a live mission feed, and a miniature orbital visualization. Current feed/status values are mock data.

## FR-008 — Alerts

Mock alert data includes critical/high/medium/low severity examples and active/monitoring states.

## FR-009 — Route restriction

Guests are explicitly blocked from `/3d`, `/alerts`, and `/maneuvers`. The restriction is enforced in the React application.

## FR-010 — Visualization

The application includes a Three.js/React Three Fiber visualization feature and a dedicated `/3d` page.

## FR-011 — Manoeuvre comparison

Mock manoeuvre records are available to the frontend and include type, delta-V, fuel cost, duration, and risk level.

## Planned analytical requirements

The original repository design describes additional functions such as conjunction detection, risk assessment, manoeuvre generation, simulation, and optimization. These are retained as **planned requirements**, not current capabilities.
