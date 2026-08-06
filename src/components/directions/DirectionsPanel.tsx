import { useCampusMap } from '@/context/CampusMapContext'

export function DirectionsPanel() {
  const { destination, setDestination, origin, route, userPosition, requestLocation } = useCampusMap()
  const isUsingCurrentLocation = Boolean(userPosition)

  if (!destination) return null

  return (
    <section id="directions" className="border-t border-[var(--color-line)] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-forest)]">Route overview</p>
          <h3 className="mt-2 text-base font-semibold text-[var(--color-ink)]">Directions to {destination.name}</h3>
        </div>
        <button
          type="button"
          onClick={() => setDestination(null)}
          className="rounded-[2px] border border-[var(--color-line)] px-3 py-1.5 text-xs text-[var(--color-muted)] hover:border-[var(--color-forest)] hover:text-[var(--color-ink)]"
        >
          Clear
        </button>
      </div>

      <div className="mt-3 rounded-[2px] border border-[var(--color-line)] bg-[var(--color-bg)] p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--color-forest)] bg-white px-2 py-1 text-[10px] font-semibold text-[var(--color-forest)]">From</span>
          <span className="text-sm text-[var(--color-ink)]">{origin.name}</span>
        </div>
        {route && route.waypoints.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--color-line)] bg-white px-2 py-1 text-[10px] font-semibold text-[var(--color-muted)]">Via</span>
            {route.waypoints.map((waypoint, index) => (
              <span
                key={`${waypoint.lat}-${waypoint.lng}-${index}`}
                className="rounded-full border border-[var(--color-line)] bg-white px-2 py-1 text-[10px] text-[var(--color-ink)]"
              >
                Waypoint {index + 1}
              </span>
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--color-forest)] bg-white px-2 py-1 text-[10px] font-semibold text-[var(--color-forest)]">To</span>
          <span className="text-sm text-[var(--color-ink)]">{destination.name}</span>
        </div>
      </div>

      {!isUsingCurrentLocation && (
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={requestLocation}
            className="w-full rounded-[2px] border border-[var(--color-forest)] bg-[var(--color-forest)]/5 px-3 py-2 text-sm font-medium text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white"
          >
            Use my current location
          </button>
          <p className="text-xs text-[var(--color-muted)]">
            Showing directions from {origin.name} until you share your location.
          </p>
        </div>
      )}

      {route ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-[2px] border border-[var(--color-line)] bg-white p-3">
            <p className="text-sm font-semibold text-[var(--color-forest)]">{route.estimatedMinutes} min · {route.totalDistanceMeters} m</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              {route.steps.length} step{route.steps.length === 1 ? '' : 's'} · {route.waypoints.length} waypoint{route.waypoints.length === 1 ? '' : 's'}
            </p>
          </div>

          <ol className="space-y-3">
            {route.steps.map((step, i) => (
              <li key={i} className="rounded-[2px] border border-[var(--color-line)] bg-[var(--color-bg)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="plate rounded-full bg-[var(--color-forest)]/10 px-2 py-1 text-[10px] font-semibold text-[var(--color-forest)]">Step {i + 1}</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">{step.distanceMeters} m</span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-ink)]">{step.instruction}</p>
                {step.cue && <p className="mt-2 text-xs text-[var(--color-muted)]">{step.cue}</p>}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  )
}
