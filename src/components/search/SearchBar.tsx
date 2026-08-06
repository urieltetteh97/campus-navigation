import { useCampusMap } from '@/context/useCampusMap'

export function SearchBar() {
  const { filters, setFilters } = useCampusMap()

  return (
    <div className="relative">
      <label htmlFor="campus-search" className="sr-only">
        Search buildings and locations
      </label>
      <input
        id="campus-search"
        type="text"
        value={filters.query}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        placeholder="Search a building, hall, or code (e.g. SCI-2)"
        className="w-full rounded-[2px] border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-forest)]"
      />
    </div>
  )
}
