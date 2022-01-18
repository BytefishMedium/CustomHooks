import { useState, useCallback } from 'react'

export default function useAsync(callbackFunc) {
  const [data, setData] =  useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setData(null)
    setError(null)

    try{
      const res = await callbackFunc()
      setData(res)
    }catch (error){
      setError(error)
    }finally {
      setLoading(false)
    }
  }, [callbackFunc])

  return {execute, loading, data, error}
}
