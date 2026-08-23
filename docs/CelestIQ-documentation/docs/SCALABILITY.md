# Scalability

Current architecture: single backend service — scales vertically.

Recommendations (future)
- Split heavy components (propagation, simulation) into worker services.
- Add load balancer, caching (Redis), and DB scaling strategy.
# Scalability

## Current architecture

The current application is primarily browser-local and therefore does not provide multi-user server scalability.

## Current bottlenecks

- Authentication data is browser-local.
- Mock data is bundled with the frontend.
- No backend compute service exists.
- No persistent database exists.
- 3D rendering occurs in the client.

## Future horizontal scaling

Once implemented, the analytical backend can be designed as stateless API services where possible. Compute-heavy orbital/risk/manoeuvre jobs may be moved to workers.

## Database scaling

A real SQL database should use:

- Proper indexes for time/object identifiers.
- Pagination.
- Connection pooling.
- Retention policies for high-volume event data.

## Caching

Potential candidates include:

- Static orbital metadata.
- Repeated conjunction calculations.
- Read-heavy dashboard summaries.

## Load balancing

Not applicable to the current deployment. A future API layer can be placed behind a load balancer if horizontally scaled.

## Current vs future

All horizontal scaling, load balancing, caching, and database scaling statements in this document are **future recommendations**, not implemented capabilities.
