import { useCallback, useRef, useState } from 'react'
import { Grid, Loader, Select, Text, Title } from '@mantine/core'
import { LocationCard } from '../components/LocationCard'
import { ILocation } from '../types/interfaces'
import { useCategory } from '../hooks/useCategory'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'
import { useMediaQuery } from '@mantine/hooks'

export const LocationsPage = () => {
  const max800px = useMediaQuery('(max-width: 50em)')
  const max550px = useMediaQuery('(max-width: 35em)')
  const [sortParams, setSortParams] = useSearchParams()
  const sort = sortParams.get('sort')

  const [pageNumber, setPageNumber] = useState(1)

  const { loading, error, categoryItems: locations, hasMore } = useCategory<ILocation>('location', pageNumber)

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

  const sortLocations = sort === 'asc' || sort === 'desc' ? _.orderBy(locations, 'name', sort) : locations

  return (
    <>
      <div>
        <Title order={1} weight={600} align='center' mb={'lg'}>
          Локации
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
          {sortLocations.map((location, index) => {
            if (locations.length - 1 === index) {
              return (
                <Grid.Col key={location.id} span={max550px ? 12 : max800px ? 6 : 4} ref={lastNodeRef}>
                  <LocationCard location={location} />
                </Grid.Col>
              )
            } else {
              return (
                <Grid.Col key={location.id} span={max550px ? 12 : max800px ? 6 : 4}>
                  <LocationCard location={location} />
                </Grid.Col>
              )
            }
          })}
        </Grid>
      </div>
      {loading && <Loader size={'xl'} />}
      {error && (
        <Text fz='lg' c='red'>
          {error}
        </Text>
      )}
    </>
  )
}
