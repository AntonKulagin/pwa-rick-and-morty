import { useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IEpisode } from '../types/interfaces'
import { useCategory } from '../hooks/useCategory'
import { EpisodeCard } from '../components/EpisodeCard'
import { Grid, Loader, Select, Text, Title } from '@mantine/core'
import _ from 'lodash'
import { useMediaQuery } from '@mantine/hooks'

export const EpisodesPage = () => {
  const max800px = useMediaQuery('(max-width: 50em)')
  const max550px = useMediaQuery('(max-width: 35em)')
  const [pageNumber, setPageNumber] = useState(1)
  const [sortParams, setSortParams] = useSearchParams({})
  const sort = sortParams.get('sort')
  const observer = useRef<IntersectionObserver>()

  const handleChange = (sort: 'asc' | 'desc') => {
    setSortParams({ sort })
  }

  const { loading, error, categoryItems: episodes, hasMore } = useCategory<IEpisode>('episode', pageNumber)

  const lastNodeRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1)
        }
      })

      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore],
  )

  const sortEpisodes = sort === 'asc' || sort === 'desc' ? _.orderBy(episodes, 'name', sort) : episodes

  return (
    <>
      <div>
        <Title order={1} weight={600} align='center' mb={'lg'}>
          Эпизоды
        </Title>
        <Select
          mb={'xs'}
          label='Сортировка по ...'
          placeholder='Выберите вид сортировки'
          value={sort}
          data={[
            { value: 'asc', label: 'Возрастанию' },
            { value: 'desc', label: 'Убыванию' },
          ]}
          onChange={handleChange}
        />

        <Grid>
          {sortEpisodes.map((episode, index) => {
            if (episodes.length - 6 === index) {
              return (
                <Grid.Col key={episode.id} span={max550px ? 12 : max800px ? 6 : 4} ref={lastNodeRef}>
                  <EpisodeCard episode={episode} />
                </Grid.Col>
              )
            } else {
              return (
                <Grid.Col key={episode.id} span={max550px ? 12 : max800px ? 6 : 4}>
                  <EpisodeCard episode={episode} />
                </Grid.Col>
              )
            }
          })}
        </Grid>
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
