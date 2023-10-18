import { useEffect, useState } from 'react'
import { getTasksAPI } from './taskApi'
import { ITask } from './types'
import TextArea from '../../components/inputs/text-area/TextArea'
import Button from '../../components/inputs/Button'
import TaskList from './TaskList'
import AddTask from './AddTask'

const TasksView = ({ userId, isCurrentUser }: { userId: string; isCurrentUser: boolean }) => {
  const [addTask, setAddTask] = useState<boolean>(false)

  return (
    <>
      {addTask ? <AddTask finishAddingTask={() => setAddTask(false)} /> : null}
      <TaskList userId={userId} />
      {isCurrentUser ? <Button onClick={() => setAddTask(true)}> AddTask </Button> : null}
    </>
  )
}

export default TasksView
