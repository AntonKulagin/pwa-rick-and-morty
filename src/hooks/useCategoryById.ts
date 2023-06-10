import axios from 'axios'
import { useEffect, useState } from 'react'

interface ICategoryById<T> {
  loading: boolean
  error: boolean
  itemById: T
}

export const useCategoryById = <T>(category: string, id: string): ICategoryById<T | undefined> => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [itemById, setItemById] = useState<T>()

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios<T>({
      method: 'GET',
      url: `https://rickandmortyapi.com/api/${category}/${id}`,
    })
      .then((res) => {
        setItemById(res.data)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [category, id])

  return { loading, error, itemById }
}
