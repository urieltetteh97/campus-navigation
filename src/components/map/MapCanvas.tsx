import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCampusMap } from '@/context/CampusMapContext'
import type { CampusLocation } from '@/types/campus'
import { TILE_LAYERS, type MapLayerId } from './tileLayers'
import { createPlateIcon } from './markerIcon'
import { LayerToggle } from './LayerToggle'
import { LocateControl } from './LocateControl'

// Campus centerpoint — see data/buildings.ts for the note on why building
// coordinates are placeholders pending a real on-site survey.
const CAMPUS_CENTER: [number, number] = [6.6969, -1.6813]
const DEFAULT_ZOOM = 17

/** Flies the map to a location whenever the selection changes. */
function FlyToSelection({ location }: { location: CampusLocation | null }) {
  const map = useMap()
  useEffect(() => {
    if (location) {
      map.flyTo([location.coordinates.lat, location.coordinates.lng], Math.max(map.getZoom(), DEFAULT_ZOOM), {
        duration: 0.6,
      })
    }
  }, [location, map])
  return null
}

export function MapCanvas() {
  const { filteredLocations, selectedLocation, selectLocation } = useCampusMap()
  const [layer, setLayer] = useState<MapLayerId>('street')

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-[2px] border border-[var(--color-line)]">
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
        style={{ background: 'var(--color-bg)' }}
      >
        <TileLayer
          key={layer}
          url={TILE_LAYERS[layer].url}
          attribution={TILE_LAYERS[layer].attribution}
          maxZoom={TILE_LAYERS[layer].maxZoom}
        />
        <FlyToSelection location={selectedLocation} />
        <LocateControl />

        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={createPlateIcon(location.code, selectedLocation?.id === location.id)}
            eventHandlers={{ click: () => selectLocation(location.id) }}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.code}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <LayerToggle layer={layer} onChange={setLayer} />
    </div>
  )
}
