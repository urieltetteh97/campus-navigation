import { categoryLabels } from '@/data/buildings'
import { useCampusMap } from '@/context/CampusMapContext'

export function LocationDetailPanel() {
  const { selectedLocation, setDestination } = useCampusMap()

  if (!selectedLocation) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-center text-sm text-[var(--color-muted)]">
        Select a location on the map or from search to see details.
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="plate text-[11px] text-[var(--color-forest)]">{selectedLocation.code}</p>
          <h2 className="text-lg font-semibold leading-tight">{selectedLocation.name}</h2>
        </div>
        <span className="plate rounded-[2px] border border-[var(--color-line)] px-2 py-0.5 text-[10px] text-[var(--color-muted)]">
          {categoryLabels[selectedLocation.category]}
        </span>
      </div>

      <p className="text-sm text-[var(--color-ink)]">{selectedLocation.description}</p>

      {selectedLocation.hours && (
        <p className="text-xs text-[var(--color-muted)]">Open {selectedLocation.hours}</p>
      )}

      {selectedLocation.accessibility && (
        <p className="text-xs text-[var(--color-muted)]">
          {selectedLocation.accessibility.stepFreeEntrance
            ? 'Step-free entrance available.'
            : 'No step-free entrance at main door.'}
          {selectedLocation.accessibility.notes ? ` ${selectedLocation.accessibility.notes}` : ''}
        </p>
      )}

      <button
        type="button"
        onClick={() => setDestination(selectedLocation)}
        className="mt-auto rounded-[2px] bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-white hover:brightness-95"
      >
        Get directions here
      </button>
    </div>
  )
}
