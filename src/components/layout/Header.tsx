import { useState } from 'react'
import { useCampusMap } from '@/context/useCampusMap'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { setMobileSheetOpen } = useCampusMap()

  return (
    <header className="relative flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-forest)] px-4 py-3 text-white sm:px-6">
      <div className="flex items-center gap-3">
        <span className="plate rounded-[2px] border border-white/30 px-2 py-1 text-xs">
          USTED
        </span>
        <div>
          <h1 className="font-semibold leading-none tracking-tight">
            USTED Campus Navigator
          </h1>
          <p className="text-xs text-white/70">Tanoso Campus, Kumasi — visitor wayfinding</p>
        </div>
      </div>
      <nav className="hidden gap-10 text-sm text-white/80 sm:flex">
        <a href="#map" className="hover:text-white hover:bg-amber-500 rounded-[6px] px-3.5 py-1.5 transition-all duration-200">Map</a>
        <a href="#directions" className="hover:text-white hover:bg-amber-500 rounded-[6px] px-3.5 py-1.5 transition-all duration-200">Directions</a>
        <a href="#help" className="hover:text-white hover:bg-amber-500 rounded-[6px] px-3.5 py-1.5 transition-all duration-200">Visitor help</a>
      </nav>

      {/* Mobile actions: Locations open the bottom sheet, menu toggles nav links */}
      <div className="flex items-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => setMobileSheetOpen(true)}
          className="rounded-[2px] border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white"
        >
          Locations
        </button>
        <button
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((m) => !m)}
          className="rounded-[2px] border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="absolute right-4 top-full mt-2 w-40 rounded-[4px] border border-[var(--color-line)] bg-white text-[var(--color-ink)] shadow-lg">
            <a href="#map" className="block px-4 py-2 text-sm hover:bg-[var(--color-bg)]">Map</a>
            <a href="#directions" className="block px-4 py-2 text-sm hover:bg-[var(--color-bg)]">Directions</a>
            <a href="#help" className="block px-4 py-2 text-sm hover:bg-[var(--color-bg)]">Visitor help</a>
          </div>
        )}
      </div>
    </header>
  )
}
