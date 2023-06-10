import axios from 'axios'
import { useEffect, useState } from 'react'
import { IHero, ILocation } from '../types/interfaces'

interface ICategory<T> {
  loading: boolean
  error: boolean
  categoryItems: T[]
  hasMore: boolean
}

export const useCategory = <T>(categoryName: string, pageNumber: number): ICategory<T> => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [categoryItems, setCategoryItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setCategoryItems([])
  }, [categoryName])

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
      method: 'GET',
      url: `https://rickandmortyapi.com/api/${categoryName}`,
      params: { page: pageNumber },
    })
      .then((res) => {
        setCategoryItems((prev) => {
          return [...new Set([...prev, ...res.data.results])]
        })
        setHasMore(res.data.info.next)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [pageNumber])

  return { loading, error, categoryItems, hasMore }
}
