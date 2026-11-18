import { useParams, useNavigate } from 'react-router'
import { getShowDetails, stripHtml } from '../api/tvmaze'
import useFetch from '../hooks/useFetch'
import { Loader, ErrorMessage } from '../components/Status'
import CastList from '../components/CastList'
import EpisodeList from '../components/EpisodeList'
import { useWatchlist } from '../context/WatchlistContext'
import NotFound from './NotFound'

function ShowDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: show, loading, error } = useFetch(() => getShowDetails(id), id)
  const { isSaved, toggleShow } = useWatchlist()

  if (loading) return <Loader />
  // the api answers 404 when the show id doesn't exist
  if (error && error.includes('404')) return <NotFound message="We couldn't find that show." />
  if (error) return <ErrorMessage message={error} />

  const years = show.premiered
    ? show.premiered.slice(0, 4) + ' – ' + (show.ended ? show.ended.slice(0, 4) : 'now')
    : 'N/A'
  const network = show.network?.name || show.webChannel?.name || 'Unknown'

  return (
    <div className="details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-top">
        <div className="details-poster">
          {show.image ? (
            <img src={show.image.original} alt={show.name} />
          ) : (
            <div className="no-poster">No image</div>
          )}
        </div>

        <div className="details-info">
          <h1>{show.name}</h1>

          <div className="facts">
            {show.rating.average && <span className="fact-rating">⭐ {show.rating.average} / 10</span>}
            <span>{years}</span>
            <span>{show.status}</span>
            {show.runtime && <span>{show.runtime} min</span>}
          </div>

          <div className="genres">
            {show.genres.map((g) => (
              <span key={g} className="chip">
                {g}
              </span>
            ))}
          </div>

          <button
            className={isSaved(show.id) ? 'watch-btn saved' : 'watch-btn'}
            onClick={() => toggleShow(show)}
          >
            {isSaved(show.id) ? '✓ In your watchlist' : '+ Add to watchlist'}
          </button>

          <p className="summary">{stripHtml(show.summary) || 'No summary available.'}</p>

          <table className="info-table">
            <tbody>
              <tr>
                <td>Network</td>
                <td>{network}</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>{show.language || 'Unknown'}</td>
              </tr>
              {show.schedule?.days?.length > 0 && (
                <tr>
                  <td>Airs</td>
                  <td>
                    {show.schedule.days.join(', ')} {show.schedule.time && 'at ' + show.schedule.time}
                  </td>
                </tr>
              )}
              {show.officialSite && (
                <tr>
                  <td>Website</td>
                  <td>
                    <a href={show.officialSite} target="_blank" rel="noreferrer" className="link">
                      Official site ↗
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <section className="details-section">
        <h2 className="section-title">Cast</h2>
        <CastList cast={show._embedded?.cast} />
      </section>

      <section className="details-section">
        <h2 className="section-title">Episodes</h2>
        <EpisodeList episodes={show._embedded?.episodes} />
      </section>
    </div>
  )
}

export default ShowDetails
