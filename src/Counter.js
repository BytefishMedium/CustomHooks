import {useState} from 'react'

function Counter(){
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Counter</h2>
      <p>Count value: {count}</p>
      <button onClick={() => setCount(count + 1)}>increase</button>
      <button onClick={() => setCount(count - 1)}>decrease</button>
      <button onClick={() => setCount(0)}>reset</button>
  </div>)
}

export default Counter
