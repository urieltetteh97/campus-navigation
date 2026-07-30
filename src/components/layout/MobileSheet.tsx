import { useEffect, useState } from 'react'
import { useCampusMap } from '@/context/CampusMapContext'
import { CategoryFilters } from '@/components/search/CategoryFilters'
import { SearchResultsList } from '@/components/search/SearchResultsList'
import { LocationDetailPanel } from '@/components/directions/LocationDetailPanel'
import { DirectionsPanel } from '@/components/directions/DirectionsPanel'

/**
 * Mobile-only bottom sheet (hidden at the lg breakpoint, where the
 * three-column desktop layout takes over instead — see MapPage).
 * Peeks at a fixed height by default; expands to show either the
 * filtered results list, or a selected location's detail + directions.
 */
export function MobileSheet() {
  const { selectedLocation, selectLocation, destination, filteredLocations } = useCampusMap()
  const [expanded, setExpanded] = useState(false)

  // Selecting a pin or a result should surface details automatically.
  useEffect(() => {
    if (selectedLocation) setExpanded(true)
  }, [selectedLocation])

  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-10 flex flex-col rounded-t-[2px] border-t border-[var(--color-line)] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] transition-[height] duration-200 ease-out lg:hidden ${
        expanded ? 'h-[72%]' : 'h-14'
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex shrink-0 flex-col items-center gap-1.5 py-2"
      >
        <span className="h-1 w-10 rounded-full bg-[var(--color-line)]" aria-hidden="true" />
        <span className="sr-only">{expanded ? 'Collapse panel' : 'Expand panel'}</span>
        {!expanded && (
          <span className="px-4 text-xs text-[var(--color-muted)]">
            {selectedLocation ? selectedLocation.name : `${filteredLocations.length} locations nearby`}
          </span>
        )}
      </button>

      {expanded && (
        <div className="flex-1 overflow-y-auto">
          {selectedLocation ? (
            <div>
              <button
                type="button"
                onClick={() => selectLocation(null)}
                className="px-4 pt-1 text-xs font-medium text-[var(--color-forest)]"
              >
                ← Back to results
              </button>
              <LocationDetailPanel />
              {destination && <DirectionsPanel />}
            </div>
          ) : (
            <div className="p-3">
              <CategoryFilters />
              <div className="mt-2">
                <SearchResultsList />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
