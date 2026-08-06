import { useContext } from 'react'
import { CampusMapContext } from '@/context/CampusMapContext'

export function useCampusMap() {
  const ctx = useContext(CampusMapContext)
  if (!ctx) throw new Error('useCampusMap must be used within a CampusMapProvider')
  return ctx
}
