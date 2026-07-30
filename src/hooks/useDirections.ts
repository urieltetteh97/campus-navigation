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

    return {
      originId: origin.id,
      destinationId: destination.id,
      totalDistanceMeters: distanceMeters,
      estimatedMinutes,
      mode: 'walking',
      steps: [
        {
          instruction: `Head toward ${destination.name} (${destination.code}) from ${origin.name}.`,
          distanceMeters,
          cue: 'Follow the main pathway signage.',
        },
        {
          instruction: `Arrive at ${destination.name}.`,
          distanceMeters: 0,
        },
      ],
    }
  }, [origin, destination])
}
