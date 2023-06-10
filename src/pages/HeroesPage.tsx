import { useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HeroCard } from '../components/HeroCard'
import { IHero } from '../types/interfaces'
import { Center, Grid, Loader, Select, Text, Title } from '@mantine/core'
import _ from 'lodash'
import { useCategory } from '../hooks/useCategory'
import { useMediaQuery } from '@mantine/hooks'

export const HeroesPage = () => {
  const max800px = useMediaQuery('(max-width: 50em)')
  const max550px = useMediaQuery('(max-width: 35em)')
  const [sortParams, setSortParams] = useSearchParams()
  const sort = sortParams.get('sort')

  const [pageNumber, setPageNumber] = useState(1)

  const { loading, error, categoryItems: heroes, hasMore } = useCategory<IHero>('character', pageNumber)

  const handleChange = (sort: 'asc' | 'desc') => {
    setSortParams({ sort })
  }

  const observer = useRef<IntersectionObserver>()

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

  const sortHeroes = sort === 'asc' || sort === 'desc' ? _.orderBy(heroes, 'name', sort) : heroes

  return (
    <>
      <Title order={1} weight={600} align='center' mb={'lg'}>
        Герои
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
        {sortHeroes.map((hero, index) => {
          if (sortHeroes.length - 1 === index) {
            return (
              <Grid.Col key={hero.id} span={max550px ? 12 : max800px ? 6 : 4} ref={lastNodeRef}>
                <HeroCard hero={hero} />
              </Grid.Col>
            )
          } else {
            return (
              <Grid.Col key={hero.id} span={max550px ? 12 : max800px ? 6 : 4}>
                <HeroCard hero={hero} />
              </Grid.Col>
            )
          }
        })}
      </Grid>
      <Center maw={400} h={100} mx='auto'>
        {loading && <Loader size='xl' />}
        {error && (
          <Text fz='lg' c='red'>
            {error}
          </Text>
        )}
      </Center>
    </>
  )
}
