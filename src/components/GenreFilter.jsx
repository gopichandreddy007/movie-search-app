function GenreFilter({ genres, selected, onSelect }) {
  if (genres.length === 0) return null

  return (
    <div className="genres">
      <button className={!selected ? 'chip active' : 'chip'} onClick={() => onSelect('')}>
        All
      </button>
      {genres.map((g) => (
        <button key={g} className={selected === g ? 'chip active' : 'chip'} onClick={() => onSelect(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
