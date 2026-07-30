// Free, keyless tile sources.
//
// - OpenStreetMap: standard street map, no API key, but has usage-policy
//   rate limits (https://operations.osmfoundation.org/policies/tiles/) —
//   fine for development and light traffic; swap for a paid provider
//   (Mapbox, MapTiler) before any real production launch.
// - Esri World Imagery: free satellite/aerial imagery, no API key
//   required for reasonable use. Attribution is required and included
//   below — don't remove it.
export const TILE_LAYERS = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    maxZoom: 19,
  },
} as const

export type MapLayerId = keyof typeof TILE_LAYERS
