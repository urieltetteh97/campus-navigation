import { CampusMapProvider } from '@/context/CampusMapContext'
import { MapPage } from '@/pages/MapPage'

function App() {
  return (
    <CampusMapProvider>
      <MapPage />
    </CampusMapProvider>
  )
}

export default App
