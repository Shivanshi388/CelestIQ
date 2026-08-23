# Database

## Status

**Not implemented.**

The repository contains:

```text
database/schema.sql
database/seed.sql
database/queries.sql
```

but the inspected SQL files are empty.

## Current persistence

The implemented frontend persists authentication-related state in browser `localStorage`. This is not a relational database.

## Planned data model

The original project architecture describes future entities such as:

- Satellites.
- Space objects.
- Conjunctions.
- Manoeuvre scenarios.
- Risk results.
- Users/logs.

These should not be treated as current tables.

## Migrations

Not implemented.

## Seed data

No SQL seed data is currently implemented. User seed data exists separately in `frontend/public/db.json`.

## Backup

Not applicable to the current frontend-only persistence model. Production backup requirements must be defined when a real database is introduced.
