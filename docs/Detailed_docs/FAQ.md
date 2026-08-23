# FAQ

Q: Is CelestIQ safe to use for operational manoeuvre decisions?
A: No — CelestIQ is a research/demo prototype and not validated for operational flight‑safety.

Q: Where does the data come from?
A: Demo data in `data/sample/`. Integration with CelesTrak / Space‑Track is planned.

Q: How do I run tests?
A: `pytest -v` from repo root.
# FAQ

## Is CelestIQ an operational collision-avoidance system?

No. It is a prototype/educational decision-support project.

## Does the repository currently calculate collision probability?

No. The risk backend files are scaffolded but empty.

## Does it currently propagate satellite orbits?

No. The orbit backend modules are not implemented.

## Does it currently have a REST API?

No. API route files exist as placeholders, but there is no implemented backend service.

## Does it have a database?

Not currently. SQL files exist but are empty.

## What is actually implemented?

The frontend: authentication prototype, dashboard, alerts, manoeuvre views, orbital visualization, routing, stores, mock data, and UI components.

## Is the authentication production-ready?

No. Passwords use browser `btoa` encoding and session state is client-controlled.

## Can Guests view everything?

No. Guests are restricted from the 3D, alerts, and manoeuvre routes.

## Why are there both mock and API services?

The separation is intended to let the frontend operate today with mock data while allowing future replacement with backend API calls.

## Is Docker configured?

No. The current root tree does not contain the Docker Compose file described by the older README text.

## Are automated tests configured?

Not comprehensively. The repository has a tests directory, but the current dependency/configuration state does not establish a runnable backend pytest stack.
