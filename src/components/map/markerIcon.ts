import L from 'leaflet'

/**
 * Custom marker icon — a small code "plate" over a stem, echoing physical
 * campus signage. Built as a divIcon (plain HTML/CSS) rather than an
 * image so it inherits the app's CSS variables and needs no image assets.
 */
export function createPlateIcon(code: string, active: boolean) {
  const bg = active ? 'var(--color-amber)' : '#FFFFFF'
  const border = active ? 'var(--color-amber)' : 'var(--color-forest)'
  const text = active ? '#FFFFFF' : 'var(--color-forest)'
  const stem = active ? 'var(--color-amber)' : 'var(--color-forest)'

  return L.divIcon({
    className: '', // avoid Leaflet's default marker styling
    html: `
      <div style="display:flex; flex-direction:column; align-items:center;">
        <span style="
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 2px;
          border: 1px solid ${border};
          background: ${bg};
          color: ${text};
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          white-space: nowrap;
        ">${code}</span>
        <span style="width:2px; height:8px; background:${stem};"></span>
      </div>
    `,
    iconSize: [70, 34],
    iconAnchor: [35, 34], // bottom-center, at the tip of the stem
  })
}

export function createUserIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div style="display:flex; align-items:center; gap:0.35rem;">
        <span style="width:10px; height:10px; border-radius:50%; background:#2563eb; box-shadow:0 0 0 6px rgba(37,99,235,0.15);"></span>
        <span style="font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; padding: 2px 6px; border-radius: 2px; border: 1px solid #2563eb; background: #ffffff; color: #2563eb; box-shadow: 0 1px 3px rgba(0,0,0,0.12); white-space: nowrap;">You</span>
      </div>
    `,
    iconSize: [90, 26],
    iconAnchor: [45, 26],
  })
}
