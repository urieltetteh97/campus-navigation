import { useCampusMap } from '@/context/CampusMapContext'

export function DirectionsPanel() {
  const { destination, setDestination, origin, route, userPosition, requestLocation } = useCampusMap()
  const isUsingCurrentLocation = Boolean(userPosition)

  if (!destination) return null

  return (
    <div id="directions" className="border-t border-[var(--color-line)] bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          Directions to {destination.name}
        </h3>
        <button
          type="button"
          onClick={() => setDestination(null)}
          className="text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          Clear
        </button>
      </div>

      {!isUsingCurrentLocation && (
        <button
          type="button"
          onClick={requestLocation}
          className="mt-2 rounded-[2px] border border-[var(--color-forest)] px-3 py-1.5 text-xs font-medium text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white"
        >
          Use my current location
        </button>
      )}

      {!isUsingCurrentLocation && (
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Showing directions from {origin.name} until you share your location.
        </p>
      )}

      {route && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-[var(--color-muted)]">
            ~{route.estimatedMinutes} min walk · {route.totalDistanceMeters} m
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            The route is also shown on the map with {route.waypoints.length} waypoint{route.waypoints.length === 1 ? '' : 's'}.
          </p>
          <ol className="space-y-2">
            {route.steps.map((step, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="plate text-xs text-[var(--color-forest)]">{i + 1}</span>
                <span>{step.instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
