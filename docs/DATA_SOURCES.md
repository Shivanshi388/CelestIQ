# Data Sources and Provenance

## Current sources

| Source | Format | Current role | Trust boundary |
|---|---|---|---|
| `data/sample/` | CSV | Repository sample-data location | Demonstration only; inspect headers before use |
| `data/processed/` | Filesystem placeholder | Reserved for derived data | No processing pipeline is currently wired |
| `frontend/public/db.json` | JSON | Browser user seed data | Public asset; contains prototype account data |
| `frontend/src/services/mock/` | TypeScript | Dashboard, alert, satellite, mission, manoeuvre mock data | UI demonstration only |

## Verified ingestion behavior

`backend/app/data/ingestion.py` exposes `load_orbital_data(file_path)`. It checks that the path exists, opens UTF-8 text, uses `csv.DictReader`, and returns rows as dictionaries. It does not yet convert types, enforce a schema, normalize timestamps, or reject invalid physics values; those responsibilities are referenced in its quick-test block and reserved parser/validator modules.

## Future provider contract

An external provider integration should record provider name, retrieval timestamp, source epoch, object identifier, coordinate frame, units, uncertainty metadata, and transformation history. Raw records should remain immutable while normalized records are versioned. Do not silently mix provider data with mock data in an operator-facing result.

## Data handling rules

- Treat all sample and mock values as non-authoritative.
- Keep timestamps explicit and timezone-aware.
- Carry units alongside numeric orbital and manoeuvre values.
- Preserve source provenance through every derived record.
- Do not place secrets or real credentials in frontend assets or localStorage.
