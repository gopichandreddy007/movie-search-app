import { useState } from 'react'

function SearchBar({ initialValue, onSearch }) {
  const [text, setText] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(text.trim())
  }

  function clear() {
    setText('')
    onSearch('')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search for a show, e.g. Breaking Bad"
        aria-label="Search shows"
      />
      {text && (
        <button type="button" className="clear-btn" onClick={clear} aria-label="Clear search">
          ✕
        </button>
      )}
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  )
}

export default SearchBar
