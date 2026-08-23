# Components

Frontend
- Dashboard: lists conjunctions and summary cards.
- Conjunction view: detail and candidate comparison.
- Manoeuvres page: compares manoeuvre candidates.

Backend
- Data ingestion: read & normalise input files.
- Propagator: compute positions.
- Conjunction detector: find close approaches.
- Risk engine: PC and risk score.
- Manoeuvre engine: generator, simulator, optimizer.
- API layer: controller endpoints for UI.
# Components

## Application components

### `main.tsx`

Creates the React root and installs:

- `BrowserRouter`
- `ThemeProvider`
- Global/variable/animation styles.

### `App.tsx`

Owns the application shell and route definitions. It:

- Reads authentication state.
- Initializes the local user database when authenticated.
- Redirects unauthenticated users to `LoginPage`.
- Applies Guest route restrictions.
- Renders `Sidebar` and `Topbar`.

### `LoginPage`

Provides:

- Login.
- Signup.
- Password reset.
- Password visibility toggle.
- Guest access.
- Validation/error display.
- Loading feedback.

### Dashboard

The dashboard combines overview data, mission feed information, and orbital visualization.

### Alerts

Alert pages/components present operational alert information using mock data.

### Manoeuvres

Manoeuvre pages/components present candidate manoeuvre information using mock data.

### Orbit visualization

The visualization subsystem uses React Three Fiber and Three.js to render interactive orbital content.

## Shared components

The component tree contains reusable layout, dashboard, shared, UI, `Sidebar`, and `Topbar` components.

## State components

Zustand stores provide:

- Authentication state.
- UI state.
- Visualization state.

## Planned backend components

Backend filenames define intended components but currently contain no executable implementation.
