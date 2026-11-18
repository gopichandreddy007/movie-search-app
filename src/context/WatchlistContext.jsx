import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'showfinder-watchlist'

const WatchlistContext = createContext(null)

function loadWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

// wraps the app so any page can read or change the watchlist
export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(loadWatchlist)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  function isSaved(id) {
    return watchlist.some((s) => s.id === id)
  }

  function addShow(show) {
    if (isSaved(show.id)) return
    // only save what the cards need, not the whole api response with all episodes
    const { id, name, image, premiered, genres, rating } = show
    setWatchlist([{ id, name, image, premiered, genres, rating }, ...watchlist])
  }

  function removeShow(id) {
    setWatchlist(watchlist.filter((s) => s.id !== id))
  }

  function toggleShow(show) {
    if (isSaved(show.id)) removeShow(show.id)
    else addShow(show)
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, isSaved, addShow, removeShow, toggleShow }}>
      {children}
    </WatchlistContext.Provider>
  )
}

// small helper so components can just call useWatchlist()
// eslint-disable-next-line react-refresh/only-export-components
export function useWatchlist() {
  return useContext(WatchlistContext)
}
