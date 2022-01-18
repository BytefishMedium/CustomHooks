import {useState, useEffect } from 'react'

// https://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js

function useScrollTop(){
  const [scrollTop, setScrollTop] = useState(document.documentElement.scrollTop)

  useEffect(() => {
    const handler = () => {
      setScrollTop(document.documentElement.scrollTop)
    }
    document.addEventListener("scroll", handler)
    return () => {
      document.removeEventListener("scroll", handler)
    }
  }, [])
  return scrollTop
}

export default useScrollTop
