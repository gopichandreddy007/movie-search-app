import { Link, NavLink } from 'react-router'

function Navbar() {
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
          <NavLink to="/watchlist">Watchlist</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
