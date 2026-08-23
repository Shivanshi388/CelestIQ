# UI / UX

Frontend architecture
- Vite + React + TypeScript.
- 3D orbit rendering with `@react-three/fiber`.
- Pages: `index`, `dashboard`, `conjunction`, `manoeuvres`.

Design notes
- Focus on clarity: timelines, side‑by‑side candidate comparison.
- Accessible mobile‑friendly layout expected; verify `frontend/css/responsive.css`.

Accessibility
- No automated accessibility audit included; recommend axe checks pre‑release.
# UI/UX

## Design direction

The frontend presents an orbital command-center visual language:

- Dark operational interface.
- Glowing orbital/space motifs.
- High-contrast status indicators.
- Dense dashboard cards.
- Responsive layout.
- Iconography through Lucide React.
- Animated transitions through Framer Motion/CSS.

## Main screens

### Login

The login page supports login, signup, password reset, and guest access.

### Dashboard

The dashboard includes:

- Overview.
- Mission feed.
- Orbit visualization.

### Alerts

Provides alert/risk-oriented information.

### Manoeuvres

Provides candidate manoeuvre comparison.

### 3D Orbit View

Provides the dedicated orbital visualization experience.

### Unauthorized

Displays a dedicated restriction state for users without access to protected views.

## Navigation

`Sidebar` and `Topbar` provide the main application shell.

React Router manages route transitions.

## Responsive behavior

The implementation uses Tailwind responsive classes and dedicated layout components. A formal browser/device compatibility matrix is not documented.

## Accessibility

No formal accessibility audit is present. Form labels and buttons are present in the authentication UI, but overall WCAG compliance is **not verified**.
