# Non-Functional Requirements

- Performance: prototype modules favour clarity and correctness over raw performance. No formal latency SLAs implemented.
- Scalability: backend is a modular monolith; horizontal scaling not currently automated (Planned).
- Availability: no HA/deployment automation found; production readiness is Planned.
- Reliability: unit tests exist; CI not verified in raw audit (see `tests/`).
- Security: authentication not observed in audit — Not implemented. Secrets via `.env` recommended.
- Maintainability: modular layout (data/, orbit/, risk/, manoeuvre/) supports unit testing and incremental refactor.
- Usability: frontend provides dashboard prototype; UX improvements recommended.
- Observability: basic logging utilities likely present — confirm. No central metrics/monitoring found.
- Compatibility: Python 3.10+ and Node (Vite/React) environments.
# Non-Functional Requirements

## Status

The repository does not currently define formal service-level objectives or benchmark targets. The following documents observable properties and architectural expectations without inventing numerical guarantees.

| Category | Current state |
|---|---|
| Performance | Frontend build-time optimization only; no benchmark established |
| Scalability | Not validated |
| Availability | No production availability target |
| Reliability | No production reliability target |
| Security | Prototype-level client authentication |
| Maintainability | Feature-oriented TypeScript structure |
| Usability | Operator-oriented dashboard and responsive styling |
| Accessibility | Some semantic form controls; no formal accessibility audit |
| Observability | Browser console/error handling only; no monitoring platform |
| Compatibility | Modern browser assumed; no formal browser matrix |

## Maintainability

The frontend separates pages, features, components, services, stores, types, and utilities. This supports incremental replacement of mock services with real APIs.

## Usability

The interface includes:

- Authentication feedback.
- Loading indicators.
- Unauthorized states.
- Dashboard navigation.
- Responsive styling.
- Dark/light theme support.

## Security

Security is currently limited by the browser-local authentication model. See [Security Architecture](SECURITY_ARCHITECTURE.md).

## Performance

No repository benchmark establishes response-time or rendering guarantees. Visualization performance should be measured once realistic object counts and live data are introduced.

## Accessibility

No formal WCAG audit is present. Accessibility should therefore be treated as **not yet verified**, not as guaranteed.
