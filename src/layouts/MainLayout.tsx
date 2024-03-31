import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '../context/ErrorBoundary'
import { HeaderSimple } from '../components/Header'
import { Loader } from '@mantine/core'

const links = [
  { link: '/', label: 'Главная' },
  { link: '/heroes', label: 'Герои' },
  { link: '/locations', label: 'Локации' },
  { link: '/episodes', label: 'Эпизоды' },
]

export const MainLayout = () => {
  return (
    <>
      <HeaderSimple links={links} />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
