import {useState} from 'react'

function Users(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseURL = 'https://reqres.in/api'

  const fetchUsers = async () => {
    setUsers(null)
    setError(null)
    setLoading(true)
    try{
      const res = await fetch(`${baseURL}/users`)
      const json = await res.json()
      setUsers(json.data)
    }catch (error){
      setError(error)
    }finally {
      setLoading(false)
    }
  }

  return <div>
    <h2>users</h2>
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

export default Users
