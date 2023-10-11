import { Outlet } from 'react-router-dom'
import Search from '../features/search/Search'
import UserMenu from '../features/users/UserMenu'

const MainLayout = () => {
  return (
    <div className='layout-wrapper'>
      <div className='sidebar'>
        <Search />
      </div>
      <div className='container'>
        <div className='header'>
          <div className='user-menu-container'>
            <UserMenu />
          </div>
        </div>
        <div className='main'>
          <Outlet />
        </div>
      </div>
      <style jsx>
        {`
          .layout-wrapper {
            display: flex;
            width: 100%;
            min-height: 100vh;
          }
          .sidebar {
            background-color: lightblue;
          }
          .container {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
          .header {
            height: 50px;
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
          }
          .user-menu-container {
            margin-left: auto;  
          }
        `}
      </style>
    </div>
  )
}

export default MainLayout
