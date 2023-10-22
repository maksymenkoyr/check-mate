import { Outlet } from 'react-router-dom'
import Search from '../features/search/Search'
import UserMenu from '../features/users/UserMenu'
import { Button } from '@mui/material'
import { colors } from '../utils/colors'
import FriendsList from '../features/users/FriendsList'

const MainLayout = () => {
  return (
    <div className='layout-wrapper'>
      <div className='sidebar l-sidebar'>
        <Search />
        <FriendsList />
      </div>
      <div className='main'>
        <div className='main'>
          <Outlet />
        </div>
      </div>
      <div className='sidebar r-sidebar'>
        <UserMenu />
      </div>
      <style jsx>
        {`
          .layout-wrapper {
            display: flex;
            width: 100%;
            min-height: 100vh;
          }
          .main {
            flex-grow: 1;
          }
          .l-sidebar {
            background-color: ${colors.background2};
            width: 250px;
            padding: 5px;
          }
          .r-sidebar {
            flex-grow: 0.2;
          }
        `}
      </style>
    </div>
  )
}

export default MainLayout
