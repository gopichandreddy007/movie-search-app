import { Link } from 'react-router'

function NotFound({ message = "This page doesn't exist." }) {
  return (
    <div className="status not-found">
      <p className="big">404</p>
      <p>{message}</p>
      <Link to="/" className="link">
        ← Back to home
      </Link>
    </div>
  )
}

export default NotFound
