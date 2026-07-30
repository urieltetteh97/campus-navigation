import { buildings } from '@/data/buildings'
import { useCampusMap } from '@/context/CampusMapContext'
import { useDirections } from '@/hooks/useDirections'
import { useGeolocation } from '@/hooks/useGeolocation'

// Fallback origin when the visitor hasn't shared their location yet —
// the main gate, where most visitors actually start.
const DEFAULT_ORIGIN = buildings.find((b) => b.id === 'main-gate') ?? buildings[0]

export function DirectionsPanel() {
  const { destination, setDestination } = useCampusMap()
  const { position, requestLocation, loading } = useGeolocation()

  const origin = position
    ? { ...DEFAULT_ORIGIN, id: 'you', name: 'Your location', coordinates: position }
    : DEFAULT_ORIGIN

  const route = useDirections(origin, destination)

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

      {!position && (
        <button
          type="button"
          onClick={requestLocation}
          disabled={loading}
          className="mt-2 rounded-[2px] border border-[var(--color-forest)] px-3 py-1.5 text-xs font-medium text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white"
        >
          {loading ? 'Locating…' : 'Use my current location'}
        </button>
      )}

      {!position && (
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Showing directions from {DEFAULT_ORIGIN.name} until you share your location.
        </p>
      )}

      {route && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-[var(--color-muted)]">
            ~{route.estimatedMinutes} min walk · {route.totalDistanceMeters} m
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
