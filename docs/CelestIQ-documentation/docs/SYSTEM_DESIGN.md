# System Design

Design principles
- Single backend service exposing HTTP APIs and modular internal services.
- Clear separation: ingestion → propagation → detection → risk → manoeuvre → UI.

State management
- Short‑lived in‑memory propagation for scenario runs.
- Persistent items (satellites, conjunction records, reports) can be stored in SQL DB (`database/schema.sql`).

Failure handling
- Validate inputs early; return 4xx for bad requests.
- Log exceptions and return safe 5xx responses.
# System Design

## Current design

The implemented subsystem follows a client-side SPA architecture:

- React component tree.
- React Router for navigation.
- Zustand for state.
- Feature-oriented modules.
- Mock services.
- Browser localStorage for session/user state.
- Three.js-based visualization.

## Design principles

### Separation of concerns

UI pages do not need to own all domain data. Feature modules, services, stores, and shared types provide separation.

### Replaceable data providers

The repository has distinct `services/api` and `services/mock` directories. This is a useful seam for replacing mock data with real HTTP calls.

### Centralized session state

Authentication state is held in one Zustand store and consumed by the application shell.

### Progressive backend introduction

The planned Python structure can be introduced independently behind stable service contracts.

## Failure handling

The current authentication database initialization catches fetch/JSON errors and logs them to the browser console.

UI-level failures are represented through error messages and unauthorized pages.

## Scalability

The frontend structure can scale by adding feature modules. The current browser-local data approach cannot serve multi-user operational workloads.

A production architecture will require server-side state, API boundaries, persistence, and controlled authentication.
