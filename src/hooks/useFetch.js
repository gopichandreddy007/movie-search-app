import { useState, useEffect } from 'react'

// runs an async function and gives back { data, loading, error }
// it runs again whenever something in `deps` changes
function useFetch(fetchFn, deps) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // if the user types fast, an older request can finish after a newer one.
    // this flag makes sure we only keep the result of the latest request
    let ignore = false

    setLoading(true)
    setError(null)

    fetchFn()
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}

export default useFetch
