import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { authorizeUser } from './features/authentication/authService'

const AppRoot = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { isLoading, isAuthenticated, user } = useAppSelector(state => state.authReducer)
  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('token')) dispatch(authorizeUser())
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }
  console.log(isAuthenticated)
  if (isAuthenticated) {
    if (location.pathname === '/login' || location.pathname === '/registration') {
      return <Navigate to={`/${user!._id}`} />
    }
    if (location.pathname === '/') {
      return <Navigate to={`/${user!._id}`} />
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
