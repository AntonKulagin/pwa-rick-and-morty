import { useLocation, useParams } from 'react-router-dom'
import { IEpisode } from '../types/interfaces'
import { Loader, Text, Title } from '@mantine/core'
import { useCategoryById } from '../hooks/useCategoryById'
import { GoBack } from './GoBack'

export const EpisodeCardInfo = () => {
  const locationData = useLocation()
  const { episodeId } = useParams()

  if (!episodeId) {
    return <Loader />
  }

  const { loading, error, itemById: episode } = useCategoryById<IEpisode>('episode', episodeId)

  return (
    <>
      <GoBack goBackUrl={locationData.state} />

      <Title fz={32} mb={16}>
        {episode?.name}
      </Title>
      <div>
        <Text>Название: {episode?.name}</Text>
        <Text>Эпизод: {episode?.episode}</Text>
        <Text>Дата выхода в эфир: {episode?.air_date}</Text>
        <Text>Создан: {episode?.created}</Text>
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
