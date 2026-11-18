import { useSearchParams } from 'react-router'
import { getTopShows, searchShows } from '../api/tvmaze'
import useFetch from '../hooks/useFetch'
import ShowCard from '../components/ShowCard'
import SearchBar from '../components/SearchBar'
import { Loader, ErrorMessage } from '../components/Status'

function Home() {
  // keep the search text in the url (?q=...) so refresh and the back button work
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const { data: shows, loading, error } = useFetch(
    () => (query ? searchShows(query) : getTopShows()),
    [query]
  )

  function handleSearch(text) {
    setSearchParams(text ? { q: text } : {})
  }

  return (
    <div>
      <h1>Find your next show</h1>
      {/* key={query} resets the input when the url changes (back button, clicking Home) */}
      <SearchBar key={query} initialValue={query} onSearch={handleSearch} />

      <h2 className="section-title">{query ? `Results for "${query}"` : '⭐ Top rated shows'}</h2>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && shows.length === 0 && (
        <p className="status">No shows found for "{query}". Try another name.</p>
      )}

      {!loading && !error && shows.length > 0 && (
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
