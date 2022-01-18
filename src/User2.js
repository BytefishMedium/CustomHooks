import {useState} from 'react'
import useAsync from './hooks/useAsync'

function Users2(){
  const baseURL = 'https://reqres.in/api'

  const {
    execute: fetchUsers,
    data: users,
    loading,
    error
  } = useAsync(async () => {
    const res = await fetch(`${baseURL}/users`)
    const json = await res.json()
    return json.data
  })

  return <div>
    <h2>Users with custom hook</h2>
    <button onClick={fetchUsers} disabled={loading}>
      {loading ? "Loading..." : "Show Users"}
    </button>

    {
      error &&
      <div style={{color: "red"}}>something error</div>
    }

    <ul>
      {
        users && users.length > 0 &&
        users.map(user => <li key={user.id}>{user.first_name}</li>)
      }
    </ul>
  </div>
}

export default Users2
