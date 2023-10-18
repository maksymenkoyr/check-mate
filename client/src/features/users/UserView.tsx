import { useParams } from 'react-router-dom'
import TasksView from '../tasks/TasksView'

const UserView = () => {
  const { userId } = useParams()
  // const isCurrentUser = userId ===
  return <TasksView userId={userId} />
}

export default UserView
