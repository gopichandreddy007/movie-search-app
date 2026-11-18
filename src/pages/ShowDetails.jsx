import { useParams } from 'react-router'

function ShowDetails() {
  const { id } = useParams()

  return (
    <div>
      <h1>Show #{id}</h1>
    </div>
  )
}

export default ShowDetails
