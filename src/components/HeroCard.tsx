import { Avatar, Text, Button, Paper, Flex } from '@mantine/core'
import { FC } from 'react'
import { IHero } from '../types/interfaces'
import { useLocation, useNavigate } from 'react-router-dom'

interface HeroCardProps {
  hero: IHero
}

export const HeroCard: FC<HeroCardProps> = ({ hero }) => {
  const navigate = useNavigate()
  const locationData = useLocation()
  return (
    <Paper
      h={'100%'}
      radius='md'
      withBorder
      p='lg'
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Flex direction='column' h='100%'>
        <Avatar src={hero.image} size={120} radius={120} mx='auto' />
        <Text ta='center' fz='lg' weight={500} mt='md'>
          {hero.name}
        </Text>
        <Text ta='center' c='dimmed' fz='sm' style={{ flex: '1 1 auto' }}>
          {hero.species}
        </Text>

        <Button
          variant='default'
          fullWidth
          mt='md'
          onClick={() => navigate(`${hero.id}`, { state: locationData.pathname })}
        >
          Подробнее
        </Button>
      </Flex>
    </Paper>
  )
}
