import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IEpisode } from '../types/interfaces'
import { Flex, Paper, Text } from '@mantine/core'

interface EpisodeCardProps {
  episode: IEpisode
}

export const EpisodeCard: FC<EpisodeCardProps> = ({ episode }) => {
  const locationData = useLocation()
  return (
    <Link to={`${episode.id}`} state={locationData.pathname} style={{ textDecoration: 'none' }}>
      <Paper
        h='100%'
        radius='md'
        withBorder
        p='lg'
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        })}
      >
        <Flex direction='column' h='100%'>
          <Text ta='center' fz='lg' weight={500}>
            {episode.name}
          </Text>
        </Flex>
      </Paper>
    </Link>
  )
}
