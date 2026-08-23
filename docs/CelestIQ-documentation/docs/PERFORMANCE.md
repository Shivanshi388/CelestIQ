# Performance

Current
- Prototype emphasizes correctness; heavy operations include orbit propagation and Monte‑Carlo simulations.

Recommendations
- Profile the propagator and optimise hot paths.
- Add caching for repeated propagation results.
- Offload heavy simulations to background workers.
# Performance

## Current performance characteristics

No formal benchmarks are published.

The frontend uses:

- Vite for development/build tooling.
- React componentization.
- Three.js/React Three Fiber for visualization.
- Tailwind CSS for styling.

## Performance-sensitive area

The orbital visualization is the most obvious rendering-sensitive subsystem because it uses a 3D scene.

## Current optimization claims

No repository evidence supports numerical performance guarantees.

## Potential future optimizations

These are recommendations:

- Reduce unnecessary React re-renders.
- Memoize expensive visualization calculations.
- Use level-of-detail strategies for large object counts.
- Batch or decimate visualization data.
- Move heavy orbital calculations to backend workers.
- Cache repeated analytical results.
- Avoid sending high-frequency telemetry to the UI when not needed.

## Benchmarking

Benchmarks should be introduced only after representative satellite/object datasets exist.
