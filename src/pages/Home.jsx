import { getTopShows } from '../api/tvmaze'
import useFetch from '../hooks/useFetch'
import ShowCard from '../components/ShowCard'
import { Loader, ErrorMessage } from '../components/Status'

function Home() {
  const { data: shows, loading, error } = useFetch(getTopShows, [])

  return (
    <div>
      <h1>Find your next show</h1>
      <h2 className="section-title">⭐ Top rated shows</h2>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
