import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { buildings } from '@/data/buildings'
import type { CampusLocation, SearchFilters } from '@/types/campus'

interface CampusMapState {
  locations: CampusLocation[]
  selectedLocation: CampusLocation | null
  selectLocation: (id: string | null) => void
  filters: SearchFilters
  setFilters: (filters: SearchFilters) => void
  filteredLocations: CampusLocation[]
  destination: CampusLocation | null
  setDestination: (location: CampusLocation | null) => void
}

const CampusMapContext = createContext<CampusMapState | undefined>(undefined)

export function CampusMapProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [destination, setDestination] = useState<CampusLocation | null>(null)
  const [filters, setFilters] = useState<SearchFilters>({ query: '', categories: [] })

  const selectedLocation = useMemo(
    () => buildings.find((b) => b.id === selectedId) ?? null,
    [selectedId],
  )

  const filteredLocations = useMemo(() => {
    return buildings.filter((location) => {
      const matchesQuery = filters.query.trim().length === 0
        || location.name.toLowerCase().includes(filters.query.toLowerCase())
        || location.code.toLowerCase().includes(filters.query.toLowerCase())

      const matchesCategory = filters.categories.length === 0
        || filters.categories.includes(location.category)

      return matchesQuery && matchesCategory
    })
  }, [filters])

  const value: CampusMapState = {
    locations: buildings,
    selectedLocation,
    selectLocation: setSelectedId,
    filters,
    setFilters,
    filteredLocations,
    destination,
    setDestination,
  }

  return <CampusMapContext.Provider value={value}>{children}</CampusMapContext.Provider>
}

export function useCampusMap() {
  const ctx = useContext(CampusMapContext)
  if (!ctx) throw new Error('useCampusMap must be used within a CampusMapProvider')
  return ctx
}
