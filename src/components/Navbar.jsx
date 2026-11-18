import { Link, NavLink } from 'react-router'
import { useWatchlist } from '../context/WatchlistContext'

function Navbar() {
  const { watchlist } = useWatchlist()

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          🎬 ShowFinder
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/watchlist">
            Watchlist
            {watchlist.length > 0 && <span className="count">{watchlist.length}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
