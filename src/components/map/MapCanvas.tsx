import { useEffect, useMemo, useState } from 'react'
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCampusMap } from '@/context/useCampusMap'
import { buildings } from '@/data/buildings'
import type { CampusLocation } from '@/types/campus'
import { TILE_LAYERS, type MapLayerId } from './tileLayers'
import { createPlateIcon, createUserIcon } from './markerIcon'
import { LayerToggle } from './LayerToggle'
import { LocateControl } from './LocateControl'
import { MapErrorBoundary } from './MapErrorBoundary'

// Campus centerpoint — see data/buildings.ts for the note on why building
// coordinates are placeholders pending a real on-site survey.
const CAMPUS_CENTER: [number, number] = [6.6969, -1.6813]
const DEFAULT_ZOOM = 17

/** Flies the map to a location whenever the selection changes. */
function FlyToSelection({ location }: { location: CampusLocation | null }) {
  const map = useMap()
  useEffect(() => {
    if (!location) return

    const { lat, lng } = location.coordinates
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return

    map.flyTo([lat, lng], Math.max(map.getZoom(), DEFAULT_ZOOM), {
      duration: 0.6,
    })
  }, [location, map])
  return null
}

export function MapCanvas() {
  const { filteredLocations, selectedLocation, selectLocation, route, destination, userPosition, showShuttleRoute } = useCampusMap()
  const [layer, setLayer] = useState<MapLayerId>('street')

  const destinationVisible = Boolean(destination && filteredLocations.some((location) => location.id === destination.id))
  const isUsingCurrentLocation = Boolean(userPosition)

  const shuttleStops = useMemo(
    () => [
      buildings.find((location) => location.id === 'atwima-hall'),
      buildings.find((location) => location.id === 'admin-block'),
      buildings.find((location) => location.id === 'opoku-ware-ii-hall'),
      buildings.find((location) => location.id === 'main-library'),
    ].filter(Boolean) as CampusLocation[],
    [],
  )

  const shuttlePath = useMemo(
    () => [
      [6.69673, -1.67950], // Atwima Hall
      [6.69680, -1.68020], // road south-west from Atwima Hall
      [6.69691, -1.68141], // Administration Block
      [6.69705, -1.68170], // continue along the road
      [6.69735, -1.68235], // right turn toward Opoku Ware II Hall
      [6.69783, -1.68293], // Opoku Ware II Hall
      [6.69820, -1.68305], // road toward the library
      [6.69930, -1.68290],
      [6.70020, -1.68285],
      [6.70070, -1.68280], // Library
    ] as [number, number][],
    [],
  )

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-[2px] border border-[var(--color-line)]">
      <MapErrorBoundary>
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

          {route && route.path.length > 1 && (
            <>
              <Polyline
                positions={route.path.map(({ lat, lng }) => [lat, lng] as [number, number])}
                pathOptions={{ color: '#f59e0b', weight: 5, opacity: 0.9, dashArray: '10,6' }}
              />
              {!isUsingCurrentLocation && (
                <CircleMarker
                  center={[route.path[0].lat, route.path[0].lng]}
                  radius={6}
                  pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 1 }}
                />
              )}
              <CircleMarker
                center={[route.path[route.path.length - 1].lat, route.path[route.path.length - 1].lng]}
                radius={6}
                pathOptions={{ color: '#15803d', fillColor: '#16a34a', fillOpacity: 1 }}
              />
            </>
          )}

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

          {destination && !destinationVisible && (
            <Marker
              key={`dest-${destination.id}`}
              position={[destination.coordinates.lat, destination.coordinates.lng]}
              icon={createPlateIcon(destination.code, true)}
              eventHandlers={{ click: () => selectLocation(destination.id) }}
            >
              <Popup>
                <strong>{destination.name}</strong>
                <br />
                {destination.code}
              </Popup>
            </Marker>
          )}

          {showShuttleRoute && (
            <>
              <Polyline
                positions={shuttlePath}
                pathOptions={{ color: '#1d4ed8', weight: 5, opacity: 0.85 }}
              />
              {shuttleStops.map((stop) => (
                <Marker
                  key={`shuttle-${stop.id}`}
                  position={[stop.coordinates.lat, stop.coordinates.lng]}
                  icon={createPlateIcon(stop.code, false)}
                >
                  <Popup>
                    <strong>{stop.name}</strong>
                    <br />Shuttle stop
                  </Popup>
                </Marker>
              ))}
            </>
          )}

          {userPosition && (
            <>
              <CircleMarker
                center={[userPosition.lat, userPosition.lng]}
                radius={14}
                pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.15, weight: 2 }}
              />
              <Marker
                position={[userPosition.lat, userPosition.lng]}
                icon={createUserIcon()}
              >
                <Popup>
                  <strong>Your location</strong>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </MapErrorBoundary>

      <LayerToggle layer={layer} onChange={setLayer} />
    </div>
  )
}
