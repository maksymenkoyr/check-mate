import { useEffect, useState } from 'react'
import { ITask } from './types'
import { getTasksAPI } from './taskApi'
import TaskItem from './TaskItem'

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  useEffect(() => {
    getTasksAPI().then(res => {
      setTasks(res.data)
    })
  }, [])
  return (
    <div>
      {tasks.map(task => (
        <TaskItem taskData={task}></TaskItem>
      ))}
    </div>
  )
}

export default TaskList
