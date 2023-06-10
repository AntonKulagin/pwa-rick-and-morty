import { Loader, Text, Title } from '@mantine/core'
import { useLocation, useParams } from 'react-router-dom'
import { useCategoryById } from '../hooks/useCategoryById'
import { ILocation } from '../types/interfaces'
import { FC } from 'react'
import { GoBack } from './GoBack'

export const LocationCardInfo: FC = () => {
  const { locId } = useParams()
  const locationData = useLocation()

  if (!locId) {
    return <Loader />
  }

  const { loading, error, itemById: location } = useCategoryById<ILocation>('location', locId)

  return (
    <>
      <GoBack goBackUrl={locationData.state} />

      <Title fz={32} mb={16}>
        {location?.name}
      </Title>
      <div>
        <Text>Название: {location?.name}</Text>
        <Text>Измерение: {location?.dimension}</Text>
        <Text>Тип: {location?.type}</Text>
        <Text>Создан: {location?.created}</Text>
      </div>
      {loading && <Loader />}
      {error && (
        <Text fz='lg' c='red'>
          {error}
        </Text>
      )}
    </>
  )
}
