import { Outlet } from 'react-router-dom'
import Search from '../features/search/Search'

const MainLayout = () => {
  return (
    <div className='layout-wrapper'>
      <div className='sidebar'>
        <Search />
      </div>
      <div className='container'>
        <div className='header'></div>
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
          }
        `}
      </style>
    </div>
  )
}

export default MainLayout
