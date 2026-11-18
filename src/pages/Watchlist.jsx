import { Link } from 'react-router'
import { useWatchlist } from '../context/WatchlistContext'
import ShowCard from '../components/ShowCard'

function Watchlist() {
  const { watchlist, removeShow } = useWatchlist()

  return (
    <div>
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="status">
          <p>Your watchlist is empty.</p>
          <Link to="/" className="link">
            Find something to watch →
          </Link>
        </div>
      ) : (
        <>
          <p className="muted watch-count">
            {watchlist.length} {watchlist.length === 1 ? 'show' : 'shows'} saved
          </p>
          <div className="grid">
            {watchlist.map((show) => (
              <div key={show.id} className="watch-item">
                <ShowCard show={show} />
                <button className="remove-btn" onClick={() => removeShow(show.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Watchlist
