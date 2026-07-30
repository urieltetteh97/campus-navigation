# USTED Campus Navigator

A visitor wayfinding site for the **University of Skills Training and
Entrepreneurial Development (USTED)** — formerly AAMUSTED — Tanoso campus,
Kumasi. Search faculties and facilities, browse by category, and get
walking directions from a live location or the main gate.

Stack: React + TypeScript + Vite, Tailwind CSS v4, Leaflet + React Leaflet
(real map tiles, street + satellite), React Router (installed, not yet
wired — see below), Framer Motion (installed, ready for page/panel
transitions).

## Getting started

```bash
npm install
npm run dev
```

## Structure

```
src/
  types/campus.ts          Domain model: CampusLocation, CampusRoute, etc.
                            Single source of truth for data shape — start here.
  data/buildings.ts         Sample dataset (8 locations). Replace with a
                            fetch() to a real API/CMS; nothing else needs
                            to change since components consume the same shape.
  context/CampusMapContext  Shared state: selected location, search
                            filters, active destination.
  hooks/
    useGeolocation.ts        Wraps navigator.geolocation.
    useDirections.ts         Straight-line walking estimate between two
                            points — placeholder for a real pedestrian
                            routing engine once you have path data.
  components/
    layout/Header.tsx
    search/                 SearchBar, CategoryFilters, SearchResultsList
    map/                    MapCanvas (real Leaflet map, street +
                            satellite), tileLayers.ts, markerIcon.ts,
                            LayerToggle.tsx, LocateControl.tsx
    directions/             LocationDetailPanel, DirectionsPanel
  pages/MapPage.tsx          Assembles the layout — three columns at the
                            `lg` breakpoint, full-bleed map + floating
                            search + bottom sheet below it.
```

## Responsive behavior

- **`lg` and up:** three-column layout — search/results on the left, map
  in the middle, selected location + directions on the right.
- **Below `lg`:** the map fills the screen (like Google/Apple Maps on
  mobile). Search floats over the top. `components/layout/MobileSheet.tsx`
  is a bottom sheet that peeks at a fixed height and expands to show
  either the results list or the selected location's detail +
  directions, with a "back to results" link. It auto-expands when a
  pin or result is tapped.

## Design system

Tokens live in `src/index.css` as CSS variables — a wayfinding-signage
palette (forest green, sandstone, amber "you are here" accent) with a
monospace "plate" style (`.plate` class) for building codes, echoing
physical campus signage. Panels use hairline borders and 2px corners
rather than rounded cards, matching cut-metal signage rather than a
generic app look.

## Known placeholders — swap these before shipping

1. **Map tiles** (`components/map/tileLayers.ts`) — the map now uses real,
   keyless tile providers: OpenStreetMap for street view and Esri World
   Imagery for satellite, toggled via the "Street / Satellite" control
   (top-left of the map). Both are free with no API key, but check their
   usage policies before high-traffic production use — OpenStreetMap's
   tile servers are rate-limited for light use
   (https://operations.osmfoundation.org/policies/tiles/), and a paid
   provider (Mapbox, MapTiler, Esri's paid tier) is worth considering
   once the site gets real visitor traffic.
2. **Routing** (`hooks/useDirections.ts`) — returns a straight-line
   distance/ETA, not a real path. Once you have actual campus pathway
   data (or a pedestrian routing API), replace the body of this hook;
   the return shape (`CampusRoute`) is what `DirectionsPanel` expects.
3. **Data source** (`data/buildings.ts`) — pre-filled with USTED's five
   Kumasi-campus faculties (Technical Education, Engineering and
   Technology, Vocational Education, Applied Sciences and Mathematics
   Education, Education and Communication Sciences) plus the admin
   block, library, dining hall, a hostel, sports field, and parking.
   **The coordinates are placeholders** — they're spaced out around the
   university's published location but haven't been surveyed against
   the real campus layout, and faculty/department names or building
   assignments may have changed since this was written. Before
   shipping: walk the campus with a GPS app (or trace building
   footprints in Google Earth/OpenStreetMap) for real coordinates, and
   confirm the current faculty list and building names with the
   university.
4. **Routing (URLs)** — `react-router-dom` is installed but the app is
   currently a single page. Add routes (e.g. `/building/:id`,
   `/directions`) if you want deep-linkable pages, e.g. for a QR code on
   a physical sign that opens directions to that building directly.

## Accessibility notes already in place

- Keyboard-visible focus ring (amber, matches the "you are here" accent)
- `aria-pressed` / `aria-current` on interactive pins and results
- `prefers-reduced-motion` respected globally
- Each location carries a `stepFreeEntrance` flag surfaced in the detail
  panel — extend `accessibility` in `types/campus.ts` for more detail
  (elevators, accessible restrooms, etc.) as needed
