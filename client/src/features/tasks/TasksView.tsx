import { useEffect, useState } from 'react'
import { getTasksAPI } from './taskApi'
import { ITask } from './types'
import TextArea from '../../components/inputs/text-area/TextArea'
import Button from '../../components/inputs/Button'
import TaskList from './TaskList'
import AddTask from './AddTask'

const TasksView = ({ userId }: { userId: string }) => {
  const [addTask, setAddTask] = useState<boolean>(false)

  return (
    <>
      {addTask ? <AddTask finishAddingTask={() => setAddTask(false)} /> : null}
      <TaskList userId={userId}/>
      <Button onClick={() => setAddTask(true)}> AddTask </Button>
    </>
  )
}

export default TasksView
