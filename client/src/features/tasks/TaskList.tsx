import { useEffect, useState } from 'react'
import { ITask } from './types'
import { getTasksAPI } from './taskApi'
import TaskItem from './TaskItem'

const TaskList = ({ userId }: { userId: string }) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  useEffect(() => {
    getTasksAPI(userId).then(res => {
      setTasks(res.data)
    })
  }, [userId])
  return (
    <div>
      {tasks.map(task => (
        <TaskItem taskData={task}></TaskItem>
      ))}
    </div>
  )
}

export default TaskList
