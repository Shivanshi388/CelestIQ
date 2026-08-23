# Troubleshooting

## Vite does not start

Run from the frontend directory and verify Node.js/npm are installed:

```powershell
cd frontend
npm install
npm run dev
```

If a port is occupied, use the URL Vite prints or provide a supported Vite port override.

## The page is blank or textures do not render

Check the browser console and network panel. The 3D scene expects local files under `frontend/public/Textures/`, including the day and night Earth maps. A production build must preserve those public assets.

## Login does not reflect changed seed data

The auth store caches users under `sentinel_db_users`. Clear that localStorage key, reload, and allow `/db.json` to seed the browser database again. This is a local prototype behavior.

## Guest cannot open operational views

This is intentional. `App.tsx` renders an unauthorized page for Guest on `/3d`, `/alerts`, and `/maneuvers`.

## Backend commands fail

The backend is not runnable in the current revision. Its dependency manifests, API entrypoint, and most Python modules are empty or scaffolded. Do not diagnose this as a missing local package until the project establishes a Python runtime and dependencies.

## Quality checks

```powershell
cd frontend
npm run lint
npm run build
```

These are the currently verifiable repository checks. The root Python test files do not contain executable tests in this revision.
