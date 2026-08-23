# Demo Script

## Purpose

This walkthrough demonstrates the implemented frontend experience without implying that its orbital results are scientifically computed or operationally safe.

## Before the session

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL and keep the browser console visible for diagnostics. Use synthetic or repository-provided data only.

## Walkthrough

1. **Entry:** show the login screen and the available login, signup, password-update, and guest paths.
2. **Authenticated shell:** sign in with a controlled local account and point out the sidebar, top bar, theme control, and responsive layout.
3. **Dashboard:** review the summary metrics, system status, mission feed, and orbital preview supplied by mock services.
4. **Alerts:** open an alert detail and explain that the risk presentation is UI data, not a live risk calculation.
5. **3D view:** rotate and zoom the Earth scene, toggle labels or visualization layers, select a satellite, and observe the continuously animated orbital markers.
6. **Manoeuvres:** compare candidate cards and reports, emphasizing that the comparison surface is a prototype pending backend simulation.
7. **Guest boundary:** log out, enter as Guest, and show that `/3d`, `/alerts`, and `/maneuvers` render an unauthorized state.
8. **Close:** run `npm run lint` and `npm run build` to verify the frontend artifact.

## Presenter language

Use “prototype”, “mock”, “planned”, and “decision-support interface”. Avoid “live telemetry”, “validated probability”, “autonomous avoidance”, or “flight-ready recommendation”.
