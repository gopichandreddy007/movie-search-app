import { useSearchParams } from 'react-router'
import { getTopShows, searchShows } from '../api/tvmaze'
import useFetch from '../hooks/useFetch'
import ShowCard from '../components/ShowCard'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import { Loader, ErrorMessage } from '../components/Status'

function Home() {
  // keep the search text and genre in the url (?q=...&genre=...) so refresh and back work
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const genre = searchParams.get('genre') || ''

  const { data: shows, loading, error } = useFetch(
    () => (query ? searchShows(query) : getTopShows()),
    query
  )

  function handleSearch(text) {
    // a new search starts with no genre filter
    setSearchParams(text ? { q: text } : {})
  }

  function handleGenre(newGenre) {
    const params = {}
    if (query) params.q = query
    if (newGenre) params.genre = newGenre
    setSearchParams(params)
  }

  // all genres that appear in the current results, A to Z
  const genres = shows ? [...new Set(shows.flatMap((s) => s.genres))].sort() : []
  const visibleShows = shows ? shows.filter((s) => !genre || s.genres.includes(genre)) : []

  return (
    <div>
      <h1>Find your next show</h1>
      {/* key={query} resets the input when the url changes (back button, clicking Home) */}
      <SearchBar key={query} initialValue={query} onSearch={handleSearch} />

      <h2 className="section-title">{query ? `Results for "${query}"` : '⭐ Top rated shows'}</h2>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <GenreFilter genres={genres} selected={genre} onSelect={handleGenre} />

          {visibleShows.length === 0 ? (
            <p className="status">
              {query ? `No shows found for "${query}". Try another name.` : 'No shows to show.'}
            </p>
          ) : (
            <div className="grid">
              {visibleShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home
