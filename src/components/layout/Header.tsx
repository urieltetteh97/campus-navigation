export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-forest)] px-4 py-3 text-white sm:px-6">
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
    </header>
  )
}
