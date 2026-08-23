# API Contract

## Status

**Planned. No HTTP API is live in this revision.** The endpoint names below preserve the product boundary proposed by the repository, but they are not callable contracts until the backend implementation, schemas, error handling, authentication, and tests exist.

## Proposed resource surface

| Method | Path | Intended purpose |
|---|---|---|
| `GET` | `/health` | Service liveness and build metadata |
| `GET` | `/satellites` | List tracked satellites or space objects |
| `GET` | `/conjunctions` | List conjunction summaries with TCA, miss distance, and risk |
| `GET` | `/conjunctions/{id}` | Return one encounter with uncertainty and timeline details |
| `GET` | `/risk/{id}` | Return the risk analysis for an encounter |
| `POST` | `/manoeuvres/generate` | Generate candidate manoeuvres from constraints |
| `POST` | `/manoeuvres/simulate` | Simulate one candidate and return its projected outcome |
| `POST` | `/manoeuvres/optimise` | Rank feasible candidates and identify a recommendation |
| `GET` | `/reports/{id}` | Retrieve a report in a future JSON or document format |

## Proposed shapes

```json
{
	"id": "conj-001",
	"primary_id": "sat-001",
	"secondary_id": "obj-002",
	"tca": "2026-08-23T12:00:00Z",
	"miss_distance": { "value": 1200, "unit": "m" },
	"risk_score": 0.42
}
```

```json
{
	"conjunction_id": "conj-001",
	"constraints": {
		"max_delta_v": { "value": 5, "unit": "m/s" },
		"latest_burn_time": "2026-08-23T08:00:00Z"
	}
}
```

These examples are illustrative schemas, not validated payloads. The repository currently defines no Pydantic models, route handlers, OpenAPI document, status-code policy, pagination, versioning, or rate limiting.

## Contract requirements before implementation

1. Define typed request and response models with units, precision, nullable fields, and identifiers.
2. Define validation failures separately from analytical failures and return stable error codes.
3. Add authentication and role-based authorization at the service boundary.
4. Add idempotency and audit rules for any operation that could produce an operational recommendation.
5. Add contract tests and generated OpenAPI review before connecting the frontend API adapters.

## Frontend integration point

The future HTTP client belongs in `frontend/src/services/api/`. UI components should continue to consume feature hooks or service interfaces so a real API can replace mock providers without spreading transport details through the view layer.
