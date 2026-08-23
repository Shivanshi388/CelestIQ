# Team Workplan

## Current baseline

The frontend is the only complete demonstrable product surface. Backend analytics, API contracts, database persistence, automated tests, deployment, and monitoring remain work items.

## Delivery tracks

| Track | Next concrete outcome | Acceptance evidence |
|---|---|---|
| Frontend | Connect one feature through a typed service boundary | UI behavior plus lint/build |
| Backend foundation | Establish Python version, dependencies, app factory, and health route | Reproducible local start and API test |
| Data | Define canonical orbital record schema and validation | Fixtures, malformed-input tests, provenance fields |
| Analytics | Implement and validate one pipeline stage at a time | Reference cases and numerical tolerances |
| Persistence | Choose database and migration approach | Schema, seed, rollback, backup notes |
| Security | Replace browser auth with server-managed identity | Threat model, authorization tests, secret handling |
| Quality | Add Python and frontend automated coverage | CI workflow with repeatable checks |

## Definition of done

A feature is complete when its implementation, tests, documentation status, error behavior, security implications, and reproducible verification command are all present. A filename or planned module does not count as delivered behavior.
