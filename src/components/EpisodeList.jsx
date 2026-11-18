import { useState } from 'react'

function EpisodeList({ episodes }) {
  // group episodes by season: { 1: [...], 2: [...] }
  const seasons = {}
  ;(episodes || []).forEach((ep) => {
    if (!seasons[ep.season]) seasons[ep.season] = []
    seasons[ep.season].push(ep)
  })
  const seasonNumbers = Object.keys(seasons).map(Number)

  const [season, setSeason] = useState(seasonNumbers[0])

  if (seasonNumbers.length === 0) {
    return <p className="muted">No episode information.</p>
  }

  return (
    <div>
      <div className="genres">
        {seasonNumbers.map((n) => (
          <button key={n} className={season === n ? 'chip active' : 'chip'} onClick={() => setSeason(n)}>
            Season {n}
          </button>
        ))}
      </div>

      <ul className="episodes">
        {seasons[season].map((ep) => (
          <li key={ep.id}>
            <span className="ep-number">E{ep.number ?? '–'}</span>
            <span className="ep-name">{ep.name}</span>
            <span className="ep-date">{ep.airdate || 'TBA'}</span>
            {ep.rating?.average && <span className="ep-rating">⭐ {ep.rating.average}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EpisodeList
