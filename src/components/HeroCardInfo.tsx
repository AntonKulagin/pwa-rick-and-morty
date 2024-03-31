import { createStyles, Avatar, Text, Group, Loader } from '@mantine/core'
import { IconGenderBigender, IconLiveView } from '@tabler/icons-react'
import { useLocation, useParams } from 'react-router-dom'
import { IHero } from '../types/interfaces'
import { useCategoryById } from '../hooks/useCategoryById'
import { GoBack } from './GoBack'

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))

export function HeroCardInfo() {
  const { classes } = useStyles()

  const locationData = useLocation()
  const { heroId } = useParams()

  if (!heroId) {
    return <Loader />
  }

  const { loading, error, itemById: hero } = useCategoryById<IHero>('character', heroId)

  return (
    <div>
      <GoBack goBackUrl={locationData.state} />

      <Group noWrap align='start'>
        <Avatar src={hero?.image} size='14rem' radius='md' />
        <div>
          <Text fz='2rem' tt='uppercase' fw={700} c='dimmed'>
            {hero?.name}
          </Text>

          <Text fz='lg' fw={500} className={classes.name}>
            Разновидность: {hero?.species}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconGenderBigender stroke={1.5} size='1rem' className={classes.icon} />

            <Text fz='xs' c='dimmed'>
              Пол: {hero?.gender}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconLiveView stroke={1.5} size='1rem' className={classes.icon} />
            <Text fz='xs' c='dimmed'>
              Статус: {hero?.status}
            </Text>
          </Group>
        </div>
      </Group>
      {loading && <Loader />}
      {error && (
        <Text fz='lg' c='red'>
          {error}
        </Text>
      )}
    </div>
  )
}
