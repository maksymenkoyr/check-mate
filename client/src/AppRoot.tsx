import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'
import { useAuthenticateMutation } from './features/authentication/auth-service'

const AppRoot = () => {
  const location = useLocation()
  const { isAuthenticated, user } = useAppSelector(state => state.authReducer)
  const [authenticate, { isLoading }] = useAuthenticateMutation()
  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('token')) {
      authenticate()
    }
  }, [])


  if (isLoading) {
    return <>Loading...</>
  }
  if (isAuthenticated && user) {
    if (location.pathname === '/login' || location.pathname === '/registration') {
      return <Navigate to={`/${user._id}`} />
    }
    if (location.pathname === '/') {
      return <Navigate to={`/${user._id}`} />
    }
  } else {
    if (location.pathname !== '/login' && location.pathname !== '/registration') {
      return <Navigate to='/login' />
    }
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AppRoot
