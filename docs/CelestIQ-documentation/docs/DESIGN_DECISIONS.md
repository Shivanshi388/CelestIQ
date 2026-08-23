# Design Decisions

Decision ID: D-001
Decision: Python backend with FastAPI‑style structure.
Context: team familiar with Python; computational libraries expected.
Options Considered: Node.js, Go.
Chosen Approach: Python for scientific ecosystem.
Reason: Python libraries for propagation and scientific computing.
Trade‑offs: Python single‑threaded limits; consider worker pools for heavy tasks.

Decision ID: D-002
Decision: React + Vite + Three.js frontend.
Context: immersive orbit visualisation required.
Options Considered: plain JS, other frameworks.
Chosen Approach: React + @react‑three/fiber for Three.js integration.
Trade‑offs: Larger bundle; performance tuning required for complex visuals.
# Design Decisions

## DD-001 — React/Vite frontend

**Decision:** Use React with Vite and TypeScript for the implemented frontend.

**Context:** The repository contains a Vite configuration, TypeScript configuration, React entry point, and React package dependencies.

**Options considered:** Not documented in repository history.

**Chosen approach:** React + TypeScript + Vite.

**Reason:** This is the implementation present in the repository.

**Trade-offs:** Requires a Node/npm toolchain and a client-side build step.

**Evidence/status:** Implemented.

## DD-002 — Zustand for client state

**Decision:** Use Zustand stores for authentication and UI/visualization state.

**Context:** `auth.store.ts`, `ui.store.ts`, and `visualization.store.ts` exist.

**Chosen approach:** Zustand.

**Reason:** Existing implementation.

**Trade-offs:** State remains client-side and is not a substitute for server-side persistence.

**Status:** Implemented.

## DD-003 — Mock services separated from API services

**Decision:** Maintain separate mock and API service directories.

**Context:** `frontend/src/services/mock` and `frontend/src/services/api` exist.

**Chosen approach:** Provider separation.

**Reason:** Supports prototype data today and future backend integration.

**Status:** Implemented structurally.

## DD-004 — Browser-local authentication for prototype

**Decision:** Store prototype user/session information in browser storage.

**Reason:** The current application is a frontend prototype without an implemented backend.

**Trade-offs:** Simple demonstration setup but unsuitable for production security.

**Status:** Implemented; production replacement required.

## DD-005 — Planned Python analytical backend

**Decision:** Reserve a Python backend structure for orbital/risk/manoeuvre processing.

**Context:** Backend directories and filenames exist, but source files are empty.

**Status:** Planned/scaffolded, not implemented.
