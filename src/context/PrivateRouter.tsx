import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

export const PrivateRouter = () => {
  const auth = useAuth()

  const location = useLocation()

  if (auth.userEmail === null) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
