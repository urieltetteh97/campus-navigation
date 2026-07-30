import { useCallback, useState } from 'react'
import type { Coordinates } from '@/types/campus'

interface GeolocationState {
  position: Coordinates | null
  error: string | null
  loading: boolean
}

/**
 * Wraps the browser Geolocation API. Visitors are off-campus network/GPS
 * conditions vary a lot, so this fails loud with a readable message rather
 * than hanging silently.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: false,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Location is not supported on this device.' }))
      return
    }

    setState((s) => ({ ...s, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
          loading: false,
        })
      },
      (error) => {
        setState({
          position: null,
          error: error.message || 'Could not get your location.',
          loading: false,
        })
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }, [])

  return { ...state, requestLocation }
}
