import { useAppSelector } from './hooks/redux'
import { Navigate } from 'react-router-dom'
import TaskView from './features/tasks/TasksView'
import Search from './features/search/Search'

function App() {
  const { isAuthenticated } = useAppSelector(state => state.authReducer)
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  return (
    <div>
      <Search />
      <TaskView />
    </div>
  )
}

export default App

