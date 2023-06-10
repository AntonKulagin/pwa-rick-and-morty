import { Title } from '@mantine/core'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound404 = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }, [])

  return <Title align='center'>Not Found 404</Title>
}
