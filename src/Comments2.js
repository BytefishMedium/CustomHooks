import {useState} from 'react'
import useAsync from './hooks/useAsync'

function Users(){
  const baseURL = 'https://jsonplaceholder.typicode.com'

  const handleFetchComments = async () => {
    const res = await fetch(`${baseURL}/comments?_limit=5`)
    return await res.json()
  }

  const {
    execute: fetchComments,
    data: comments,
    loading,
    error
  } = useAsync(handleFetchComments)

  return <div>
    <h2>Comments with hooks</h2>
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
