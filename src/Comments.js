import {useState} from 'react'

function Users(){
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseURL = 'https://jsonplaceholder.typicode.com'

  const fetchComments = async () => {
    try{
      const res = await fetch(`${baseURL}/comments?_limit=5`)
      const json = await res.json()
      setComments(json)
    }catch (error){
      setError(error)
    }finally {
      setLoading(false)
    }
  }

  return <div>
    <h2>Comments</h2>
    <button onClick={fetchComments} disabled={loading}>
      {loading ? "Loading..." : "Show Comments"}
    </button>

    {
      error &&
        <div style={{color: "red"}}>something error</div>
    }

    <ul>
      {
        comments && comments.length > 0 &&
          comments.map(comment => <li key={comment.id}>{comment.body}</li>)
      }
    </ul>
  </div>
}

export default Users
