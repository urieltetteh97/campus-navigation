import type { MapLayerId } from './tileLayers'

interface LayerToggleProps {
  layer: MapLayerId
  onChange: (layer: MapLayerId) => void
}

export function LayerToggle({ layer, onChange }: LayerToggleProps) {
  return (
    <div
      className="absolute left-3 top-3 z-[1000] flex overflow-hidden rounded-[2px] border border-[var(--color-line)] bg-white text-xs shadow-sm"
      role="group"
      aria-label="Map view"
    >
      <button
        type="button"
        onClick={() => onChange('street')}
        aria-pressed={layer === 'street'}
        className={`px-3 py-1.5 font-medium transition-colors ${
          layer === 'street'
            ? 'bg-[var(--color-forest)] text-white'
            : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
        }`}
      >
        Map
      </button>
      <button
        type="button"
        onClick={() => onChange('satellite')}
        aria-pressed={layer === 'satellite'}
        className={`border-l border-[var(--color-line)] px-3 py-1.5 font-medium transition-colors ${
          layer === 'satellite'
            ? 'bg-[var(--color-forest)] text-white'
            : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
        }`}
      >
        Satellite
      </button>
    </div>
  )
}
