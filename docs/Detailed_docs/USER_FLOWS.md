# User Flows

Example: Assessing a conjunction
```mermaid
flowchart LR
  User --> Frontend: Open dashboard
  Frontend --> Backend: GET /conjunctions
  User --> Frontend: Select conjunction
  Frontend --> Backend: POST /manoeuvres/generate
  Backend --> Frontend: Candidate list
  User --> Frontend: Simulate / compare
  User --> Frontend: Approve (manual)
```
# User Flows

## Authentication

```mermaid
flowchart TD
    Start["Open application"] --> Auth{"Authenticated?"}
    Auth -- No --> Login["Login page"]
    Login --> Existing["Login"]
    Login --> Signup["Signup"]
    Login --> Reset["Reset password"]
    Login --> Guest["Guest access"]
    Existing --> App["Application shell"]
    Signup --> App
    Guest --> App
    Reset --> Login
```

## Guest access

```mermaid
flowchart LR
    Guest["Continue as Guest"] --> Role["Role = Guest"]
    Role --> Dashboard["Dashboard"]
    Dashboard --> Locked3D["3D: locked"]
    Dashboard --> LockedAlerts["Alerts: locked"]
    Dashboard --> LockedManeuvers["Maneuvers: locked"]
```

## Authorized operator flow

```mermaid
flowchart LR
    Login["Authenticated user"] --> Dashboard["Dashboard"]
    Dashboard --> Alerts["Alerts"]
    Dashboard --> Orbit["3D orbit"]
    Dashboard --> Maneuvers["Maneuvers"]
```

## Future operational flow

```mermaid
flowchart LR
    Alert["Conjunction alert"] -.-> Analyze["Risk analysis"]
    Analyze -.-> Candidates["Candidate manoeuvres"]
    Candidates -.-> Simulate["Simulation"]
    Simulate -.-> Rank["Recommendation"]
    Rank -.-> Approve["Human review/approval"]
```

The future flow is not currently executable because the analytical backend is not implemented.
