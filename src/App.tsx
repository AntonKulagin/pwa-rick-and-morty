import { FC, lazy, useState } from 'react'
import { MantineProvider, Container, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { PrivateRouter } from './context/PrivateRouter'

const MainPage = lazy(() =>
  import('./pages/MainPage').then((module) => ({
    default: module.MainPage,
  })),
)

const HeroesPage = lazy(() =>
  import('./pages/HeroesPage').then((module) => ({
    default: module.HeroesPage,
  })),
)

const HeroCardInfo = lazy(() =>
  import('./components/HeroCardInfo').then((module) => ({
    default: module.HeroCardInfo,
  })),
)

const LocationsPage = lazy(() =>
  import('./pages/LocationsPage').then((module) => ({
    default: module.LocationsPage,
  })),
)

const LocationCardInfo = lazy(() =>
  import('./components/LocationCardInfo').then((module) => ({
    default: module.LocationCardInfo,
  })),
)

const EpisodesPage = lazy(() =>
  import('./pages/EpisodesPage').then((module) => ({
    default: module.EpisodesPage,
  })),
)

const EpisodeCardInfo = lazy(() =>
  import('./components/EpisodeCardInfo').then((module) => ({
    default: module.EpisodeCardInfo,
  })),
)

const Login = lazy(() =>
  import('./pages/Login').then((module) => ({
    default: module.Login,
  })),
)

const NotFound404 = lazy(() =>
  import('./pages/NotFound404').then((module) => ({
    default: module.NotFound404,
  })),
)

export const App: FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Container>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='' element={<MainPage />} />
              <Route path='heroes' element={<PrivateRouter />}>
                <Route index element={<HeroesPage />} />
                <Route path=':heroId' element={<HeroCardInfo />} />
              </Route>
              <Route path='locations' element={<PrivateRouter />}>
                <Route index element={<LocationsPage />} />
                <Route path=':locId' element={<LocationCardInfo />} />
              </Route>
              <Route path='episodes' element={<PrivateRouter />}>
                <Route index element={<EpisodesPage />} />
                <Route path=':episodeId' element={<EpisodeCardInfo />} />
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='*' element={<NotFound404 />} />
            </Route>
          </Routes>
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
