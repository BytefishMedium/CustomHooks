import { useState, useCallback, useEffect, useMemo } from 'react'
import useAsync from './hooks/useAsync'

const useArticles = () => {
  const {execute, data, loading, error} = useAsync(useCallback(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
    console.log('fetch posts: ', res)
    let posts = await res.json()
    console.log('posts:', posts)
    return posts
  }, []))

  useEffect(() => execute(), [execute])

  return {
    articles: data,
    articlesLoading: loading,
    articlesError: error
  }
}

const useComments = () => {
  const {execute, data, loading, error} = useAsync(
    useCallback(async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=30`)
      return await res.json()
    }, [])
  )

  useEffect(() => execute(), [execute])

  return {
    comments: data,
    commentsLoading: loading,
    commentsError: error
  }
}

const useCombinedArticles = (articles, comments) => {
  console.log('useCombinedArticles')
  console.log(articles, comments)
  const combinedArticles = useMemo(() => {
    if (!articles || !comments) return null

    return articles.map(article => {
      article.comments = comments.filter(comment => comment.postId === article.id)
      return article
    })
  }, [articles, comments])
  return combinedArticles
}

const useFilteredArticles = (articles, searchString) => {
  console.log('useFilteredArticles')
  console.log(articles)
  return useMemo(() => {
    if (!articles) return null

    return articles.filter(article => article.title.includes(searchString))
  }, [articles, searchString])
}

function Articles () {
  const [searchString, setSearchString] = useState('')
  const {articles, articlesError} = useArticles()
  const {comments, commentsError} = useComments()

  const combinedArticles = useCombinedArticles(articles, comments)
  console.log('combinedArticles: ', combinedArticles)

  const filteredArticles = useFilteredArticles(combinedArticles, searchString)

  if (articlesError || commentsError) return 'error happened'

  if (!filteredArticles) return 'loading'

  return <div>
    <input onChange={event => setSearchString(event.target.value)}/>
    <ul>
      {filteredArticles.map(article => {
        return <li key={article.id}>
          <h2>{article.title}</h2>
          <ul>
            {
              article.comments.map(comment => <li key={comment.id}>{comment.body}</li>)
            }
          </ul>
        </li>
      })}
    </ul>
  </div>
}

export default Articles
