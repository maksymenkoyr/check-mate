import { useEffect, useState } from 'react'
import { getTasksAPI } from './taskApi'
import { ITask } from './types'
import TextArea from '../../components/inputs/text-area/TextArea'
import Button from '../../components/inputs/Button'
import TaskList from './TaskList'
import AddTask from './AddTask'

const TasksView = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [addTask, setAddTask] = useState<boolean>(false)
  useEffect(() => {
    getTasksAPI().then(res => {
      setTasks(res.data)
    })
  }, [])
  return (
    <>{addTask ? <AddTask finishAddingTask={()=> setAddTask(false)}/> : null}
      <TaskList></TaskList>
      <Button onClick={() => setAddTask(true)}> AddTask </Button>
      {/* tasklist */}
    </>
  )
}

export default TasksView
