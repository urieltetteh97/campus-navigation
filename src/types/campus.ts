// Core domain model for the campus navigation app.
// Keep this the single source of truth for shape of campus data —
// swap `data/buildings.ts` for a real API/CMS later without
// touching components, since everything types against this file.

export type LocationCategory =
  | 'academic'
  | 'dining'
  | 'residence'
  | 'athletics'
  | 'admin'
  | 'library'
  | 'parking'
  | 'landmark'

export interface Coordinates {
  lat: number
  lng: number
}

export interface CampusLocation {
  id: string
  name: string
  /** short plate code shown on the map pin, e.g. "SCI-2" */
  code: string
  category: LocationCategory
  coordinates: Coordinates
  description: string
  /** ground-floor accessible entrance, step-free path, etc. */
  accessibility?: {
    stepFreeEntrance: boolean
    notes?: string
  }
  hours?: string
  image?: string
  /** ids of amenities inside this location, e.g. restrooms, ATM */
  amenities?: string[]
}

export interface RouteStep {
  instruction: string
  distanceMeters: number
  /** heading in degrees, or a landmark to reference */
  cue?: string
}

export interface CampusRoute {
  originId: string
  destinationId: string
  steps: RouteStep[]
  totalDistanceMeters: number
  estimatedMinutes: number
  mode: 'walking' | 'accessible'
}

export interface SearchFilters {
  query: string
  categories: LocationCategory[]
}
