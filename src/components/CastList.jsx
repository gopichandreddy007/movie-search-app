function CastList({ cast }) {
  if (!cast || cast.length === 0) {
    return <p className="muted">No cast information.</p>
  }

  return (
    <div className="cast">
      {cast.slice(0, 12).map((c) => (
        <div key={c.person.id + '-' + c.character.id} className="cast-item">
          {c.person.image ? (
            <img src={c.person.image.medium} alt={c.person.name} loading="lazy" />
          ) : (
            <div className="cast-placeholder">👤</div>
          )}
          <p className="cast-name">{c.person.name}</p>
          <p className="cast-role">{c.character.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CastList
