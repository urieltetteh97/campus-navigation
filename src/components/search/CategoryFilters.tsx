import { categoryLabels } from '@/data/buildings'
import { useCampusMap } from '@/context/useCampusMap'
import type { LocationCategory } from '@/types/campus'

export function CategoryFilters() {
  const { filters, setFilters } = useCampusMap()

  function toggle(category: LocationCategory) {
    const isActive = filters.categories.includes(category)
    setFilters({
      ...filters,
      categories: isActive
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(categoryLabels) as LocationCategory[]).map((category) => {
        const active = filters.categories.includes(category)
        return (
          <button
            key={category}
            type="button"
            onClick={() => toggle(category)}
            aria-pressed={active}
            className={`plate rounded-[2px] border px-2.5 py-1 text-[11px] transition-colors ${
              active
                ? 'border-[var(--color-forest)] bg-[var(--color-forest)] text-white'
                : 'border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[var(--color-forest)]'
            }`}
          >
            {categoryLabels[category]}
          </button>
        )
      })}
    </div>
  )
}
