import useCounter from './hooks/useCounter'

function Counter(){
  const [count, increment, decrement, reset] = useCounter()

  return (
    <div>
      <h2>Counter with custom hook</h2>
      <p>Count value: {count} times</p>
      <button onClick={increment}>increase</button>
      <button onClick={decrement}>decrease</button>
      <button onClick={reset}>reset</button>
  </div>)
}

export default Counter
