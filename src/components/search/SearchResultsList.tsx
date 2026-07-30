import { categoryLabels } from '@/data/buildings'
import { useCampusMap } from '@/context/CampusMapContext'

export function SearchResultsList() {
  const { filteredLocations, selectLocation, selectedLocation, setDestination } = useCampusMap()

  if (filteredLocations.length === 0) {
    return (
      <p className="px-1 py-6 text-sm text-[var(--color-muted)]">
        No locations match your search. Try a building name or code.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-[var(--color-line)]">
      {filteredLocations.map((location) => (
        <li key={location.id}>
          <button
            type="button"
            onClick={() => selectLocation(location.id)}
            aria-current={selectedLocation?.id === location.id}
            className={`flex w-full items-start justify-between gap-3 px-1 py-3 text-left transition-colors ${
              selectedLocation?.id === location.id ? 'bg-[var(--color-bg)]' : 'hover:bg-[var(--color-bg)]'
            }`}
          >
            <div>
              <p className="text-sm font-medium text-[var(--color-ink)]">{location.name}</p>
              <p className="text-xs text-[var(--color-muted)]">
                {categoryLabels[location.category]}
                {location.hours ? ` · ${location.hours}` : ''}
              </p>
            </div>
            <span className="plate shrink-0 rounded-[2px] border border-[var(--color-line)] px-1.5 py-0.5 text-[10px] text-[var(--color-muted)]">
              {location.code}
            </span>
          </button>
          {selectedLocation?.id === location.id && (
            <div className="px-1 pb-3">
              <button
                type="button"
                onClick={() => setDestination(location)}
                className="rounded-[2px] bg-[var(--color-amber)] px-3 py-1.5 text-xs font-medium text-white hover:brightness-95"
              >
                Get directions
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
