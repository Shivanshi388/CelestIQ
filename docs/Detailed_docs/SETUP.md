# Setup

## Current supported setup

The verified executable subsystem is `frontend/`.

### 1. Clone

```bash
git clone https://github.com/Shivanshi388/CelestIQ.git
cd CelestIQ
```

### 2. Enter frontend

```bash
cd frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start development

```bash
npm run dev
```

Vite will print the local development URL.

### 5. Verify

Confirm that:

- The login page loads.
- The dashboard renders after authentication.
- `/3d` renders the visualization for an authorized role.
- Guest access is available and selected routes are restricted.
- Alerts and manoeuvre views render.

## Build verification

```bash
npm run build
```

## Lint verification

```bash
npm run lint
```

## Backend setup

**Not currently available.** The Python application files are empty and no backend dependency set is defined.

## Database setup

**Not currently available.** SQL files exist but contain no schema/seed/query implementation.

## Environment configuration

The frontend `.env.example` currently contains no variables. No environment configuration is required by the inspected source.
