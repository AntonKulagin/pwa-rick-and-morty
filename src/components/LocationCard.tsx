import { FC, Ref, forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ILocation } from '../types/interfaces'
import { Flex, Paper, Text } from '@mantine/core'

interface LocationCardProps {
  location: ILocation
}

export const LocationCard: FC<LocationCardProps> = ({ location }) => {
  const locationData = useLocation()
  return (
    <Link to={`${location.id}`} state={locationData.pathname} style={{ textDecoration: 'none' }}>
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
          <Text ta='center' fz='lg' weight={500} mt='md' style={{ flex: '1 1 auto' }}>
            {location.name}
          </Text>
          <Text ta='center' c='dimmed' fz='sm'>
            {location.type}
          </Text>
        </Flex>
      </Paper>
    </Link>
  )
}
