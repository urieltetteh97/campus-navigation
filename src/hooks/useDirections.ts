import { useMemo } from 'react'
import type { CampusLocation, CampusRoute } from '@/types/campus'

const AVERAGE_WALK_SPEED_MPS = 1.3 // ~4.7 km/h, a relaxed visitor pace

function haversineMeters(a: CampusLocation, b: CampusLocation) {
  const R = 6371000
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.coordinates.lat - a.coordinates.lat)
  const dLng = toRad(b.coordinates.lng - a.coordinates.lng)
  const lat1 = toRad(a.coordinates.lat)
  const lat2 = toRad(b.coordinates.lat)

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2

  return 2 * R * Math.asin(Math.sqrt(h))
}

function createWaypoint(origin: CampusLocation, destination: CampusLocation) {
  const midLat = (origin.coordinates.lat + destination.coordinates.lat) / 2
  const midLng = (origin.coordinates.lng + destination.coordinates.lng) / 2
  return { lat: midLat, lng: midLng }
}

/**
 * Produces a straight-line walking estimate between two locations.
 * This is a placeholder for a real pathfinding engine (e.g. a pedestrian
 * routing graph over actual campus pathways) — swap the body of this
 * hook out once real path data exists; the return shape stays the same.
 */
export function useDirections(origin: CampusLocation | null, destination: CampusLocation | null) {
  return useMemo<CampusRoute | null>(() => {
    if (!origin || !destination) return null

    const distanceMeters = Math.round(haversineMeters(origin, destination))
    const estimatedMinutes = Math.max(1, Math.round(distanceMeters / AVERAGE_WALK_SPEED_MPS / 60))
    const waypoint = createWaypoint(origin, destination)
    const path = [origin.coordinates, waypoint, destination.coordinates]

    return {
      originId: origin.id,
      destinationId: destination.id,
      totalDistanceMeters: distanceMeters,
      estimatedMinutes,
      mode: 'walking',
      path,
      waypoints: [waypoint],
      steps: [
        {
          instruction: `Head toward ${destination.name} (${destination.code}) from ${origin.name}.`,
          distanceMeters: Math.round(haversineMeters(origin, { ...origin, coordinates: waypoint })),
          cue: 'Follow the main pathway signage.',
        },
        {
          instruction: `Continue toward ${destination.name} and arrive at your destination.`,
          distanceMeters: Math.round(haversineMeters({ ...origin, coordinates: waypoint }, destination)),
          cue: `Use the next turn or pathway toward ${destination.name}.`,
        },
        {
          instruction: `Arrive at ${destination.name}.`,
          distanceMeters: 0,
        },
      ],
    }
  }, [origin, destination])
}
