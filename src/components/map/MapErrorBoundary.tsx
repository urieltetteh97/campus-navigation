import { Component, type ErrorInfo, type ReactNode } from 'react'

interface MapErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface MapErrorBoundaryProps {
  children: ReactNode
}

export class MapErrorBoundary extends Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  state: MapErrorBoundaryState = {
    hasError: false,
    error: undefined,
  }

  static getDerivedStateFromError(error: Error): MapErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('MapErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-[420px] items-center justify-center rounded-[2px] border border-[var(--color-line)] bg-white p-4 text-center text-sm text-[var(--color-muted)]">
          <div>
            <p className="font-semibold text-[var(--color-ink)]">Something went wrong with the map.</p>
            <p className="mt-2">Please refresh the page or select another location.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
