import { useParams, useNavigate } from 'react-router'
import { getShowDetails, stripHtml } from '../api/tvmaze'
import useFetch from '../hooks/useFetch'
import { Loader, ErrorMessage } from '../components/Status'

function ShowDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: show, loading, error } = useFetch(() => getShowDetails(id), [id])

  if (loading) return <Loader />
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
    </div>
  )
}

export default ShowDetails
