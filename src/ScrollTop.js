import {useCallback} from 'react'
import useScroll from './hooks/useScrollTop'

function ScrollTop(){
  const scrollTop = useScroll()

  const goTop = useCallback(() => {
    document.documentElement.scrollTop = 0;
  }, [])

  const style = {
    position: 'fixed',
    right: '10px',
    bottom: '10px'
  }

  if (scrollTop > 100){
    return <button onClick={goTop} style={style}>
      Back to Top
    </button>
  } else {
    return null
  }
}

export default ScrollTop
