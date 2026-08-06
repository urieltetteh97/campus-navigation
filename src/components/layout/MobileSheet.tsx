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
  const { selectedLocation, selectLocation, destination, filteredLocations, route, userPosition, filters, mobileSheetOpen, setMobileSheetOpen } = useCampusMap()
  const [expanded, setExpanded] = useState(false)

  // Keep local expanded state in sync with context-driven open state
  useEffect(() => {
    setExpanded(mobileSheetOpen)
  }, [mobileSheetOpen])

  useEffect(() => {
    if (selectedLocation || destination) {
      setMobileSheetOpen(true)
      return
    }

    if (filters.query.trim().length > 0) {
      setMobileSheetOpen(true)
    }
  }, [selectedLocation, destination, filters.query, setMobileSheetOpen])

  const title = destination
    ? `Directions to ${destination.name}`
    : selectedLocation
    ? selectedLocation.name
    : `${filteredLocations.length} locations nearby`

  const subtitle = destination && route
    ? `~${route.estimatedMinutes} min · ${route.totalDistanceMeters} m · ${route.waypoints.length} waypoint${route.waypoints.length === 1 ? '' : 's'}`
    : selectedLocation
    ? 'Tap to view details and directions'
    : `${filteredLocations.length} results`

  const locationBadge = userPosition
    ? 'Using your current location'
    : 'Location not enabled'

  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-[1100] flex flex-col rounded-t-[2px] border-t border-[var(--color-line)] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] transition-[height] duration-200 ease-out lg:hidden ${
        expanded ? 'h-[72%]' : 'h-[4.5rem]'
      }`}
    >
      <button
        type="button"
        onClick={() => {
          setExpanded((current) => {
            const next = !current
            setMobileSheetOpen(next)
            return next
          })
        }}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-12 rounded-full bg-[var(--color-line)]" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{title}</p>
            <p className="truncate text-xs text-[var(--color-muted)] flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#2563eb]" aria-hidden="true" />
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-forest)]">
            {expanded ? 'Close' : 'Open'}
          </span>
          <span className="text-[10px] text-[var(--color-muted)] flex items-center gap-1">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#2563eb]" aria-hidden="true" />
            {locationBadge}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="flex-1 overflow-y-auto">
          {selectedLocation || destination ? (
            <div className="space-y-4 p-3 pb-6">
              {selectedLocation && (
                <button
                  type="button"
                  onClick={() => selectLocation(null)}
                  className="text-xs font-medium text-[var(--color-forest)]"
                >
                  ← Back to results
                </button>
              )}
              {selectedLocation && <LocationDetailPanel />}
              {destination && <DirectionsPanel />}
            </div>
          ) : (
            <div className="space-y-4 p-3 pb-6">
              <CategoryFilters />
              <div className="rounded-[2px] border border-[var(--color-line)] bg-[var(--color-bg)] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-forest)]">Search results</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">Tap a location pin or list item to open details and directions.</p>
              </div>
              <SearchResultsList />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
