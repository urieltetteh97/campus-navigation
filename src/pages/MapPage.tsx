import { Header } from '@/components/layout/Header'
import { MobileSheet } from '@/components/layout/MobileSheet'
import { SearchBar } from '@/components/search/SearchBar'
import { CategoryFilters } from '@/components/search/CategoryFilters'
import { SearchResultsList } from '@/components/search/SearchResultsList'
import { MapCanvas } from '@/components/map/MapCanvas'
import { LocationDetailPanel } from '@/components/directions/LocationDetailPanel'
import { DirectionsPanel } from '@/components/directions/DirectionsPanel'
import { useCampusMap } from '@/context/CampusMapContext'

export function MapPage() {
  const { destination } = useCampusMap()

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />

      {/* Desktop / tablet: three-column layout (search | map | details) */}
      <div className="hidden flex-1 grid-cols-[340px_1fr_320px] gap-4 overflow-hidden p-4 lg:grid">
        <aside className="flex flex-col gap-3 overflow-hidden rounded-[2px] border border-[var(--color-line)] bg-white p-3">
          <SearchBar />
          <CategoryFilters />
          <div className="flex-1 overflow-y-auto">
            <SearchResultsList />
          </div>
        </aside>

        <div className="relative min-h-[320px]">
          <MapCanvas />
        </div>

        <aside className="flex flex-col overflow-hidden rounded-[2px] border border-[var(--color-line)] bg-white">
          <div className="flex-1 overflow-y-auto">
            <LocationDetailPanel />
          </div>
          {destination && <DirectionsPanel />}
        </aside>
      </div>

      {/* Mobile: full-bleed map, floating search, draggable bottom sheet */}
      <div className="relative flex-1 lg:hidden">
        <div className="absolute inset-0">
          <MapCanvas />
        </div>

        <div className="absolute inset-x-0 top-0 z-[1100] p-3">
          <div className="rounded-[2px] bg-white p-2 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <SearchBar />
          </div>
        </div>

        <MobileSheet />
      </div>
    </div>
  )
}
