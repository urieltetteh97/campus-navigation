import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { useCampusMap } from '@/context/useCampusMap'

export function LocateControl() {
  const map = useMap()
  const { userPosition, requestLocation, loading, error } = useCampusMap()

  useEffect(() => {
    if (userPosition) {
      map.flyTo([userPosition.lat, userPosition.lng], 18)
    }
  }, [userPosition, map])

  return (
    <div className="absolute bottom-[68px] right-3 z-[1000] flex flex-col items-end gap-1 lg:bottom-3">
      {error && (
        <p role="alert" className="max-w-[220px] rounded-[2px] bg-white px-2 py-1 text-right text-xs text-red-700 shadow-sm">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={requestLocation}
        disabled={loading}
        className="rounded-[2px] border border-[var(--color-forest)] bg-white px-3 py-2 text-xs font-medium text-[var(--color-forest)] shadow-sm hover:bg-[var(--color-forest)] hover:text-white disabled:opacity-60"
      >
        {loading ? 'Locating…' : 'Find my location'}
      </button>
    </div>
  )
}
