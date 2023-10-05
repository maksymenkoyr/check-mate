import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AppRoot = () => {
  const location = useLocation()
  if (
    !localStorage.getItem('token') &&
    location.pathname !== '/login' &&
    location.pathname !== '/registration'
  ) {
    return <Navigate to='/login' />
  }

  if (location.pathname === '/login' || location.pathname === '/registration') {
    return <Navigate to={'/'} />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default AppRoot
