import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ShowDetails from './pages/ShowDetails'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>
    </>
  )
}

export default App
