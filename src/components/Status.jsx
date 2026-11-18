// small components for loading and error states, used on every page

export function Loader() {
  return (
    <div className="status">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  )
}

export function ErrorMessage({ message }) {
  return (
    <div className="status error-box">
      <p>😕 Something went wrong: {message}</p>
      <p className="muted">Check your internet connection and try again.</p>
    </div>
  )
}
