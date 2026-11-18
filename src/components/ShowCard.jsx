import { Link } from 'react-router'
import { useWatchlist } from '../context/WatchlistContext'

function ShowCard({ show }) {
  const { isSaved } = useWatchlist()
  const year = show.premiered ? show.premiered.slice(0, 4) : 'N/A'

  return (
    <Link to={`/show/${show.id}`} className="show-card">
      <div className="poster">
        {show.image ? (
          <img src={show.image.medium} alt={show.name} loading="lazy" />
        ) : (
          <div className="no-poster">No image</div>
        )}
        {show.rating?.average && <span className="rating">⭐ {show.rating.average}</span>}
        {isSaved(show.id) && (
          <span className="saved-badge" title="In your watchlist">
            ❤️
          </span>
        )}
      </div>
      <div className="show-card-info">
        <h3>{show.name}</h3>
        <p>
          {year}
          {show.genres.length > 0 && ' · ' + show.genres.slice(0, 2).join(', ')}
        </p>
      </div>
    </Link>
  )
}

export default ShowCard
