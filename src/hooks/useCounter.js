import { useState, useEffect, useCallback } from 'react';

function useCounter(){
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {setCount(count + 1)}, [count])
  const decrement = useCallback(() => {setCount(count - 1)}, [count])
  const reset = useCallback(() => {setCount(0)}, [])

  return [count, increment, decrement, reset]
}

export default useCounter
