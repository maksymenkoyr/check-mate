import { useParams } from 'react-router-dom'
import TasksView from '../tasks/TasksView'

const UserView = () => {
  const { userId } = useParams()
  console.log(userId)
  return <TasksView userId={userId} />
}

export default UserView
