import { useEffect, useState } from 'react'
import { ITask } from './types'
import { getTasksAPI } from './taskApi'
import TaskItem from './TaskItem'
import { tasksApi } from './taskService'
import { useParams } from 'react-router-dom'

const TaskList = () => {
  const { userId } = useParams()
  const { data, error, isLoading } = tasksApi.useGetAllTasksQuery(userId)
  if (isLoading) {
    return <p>Loading tasks...</p>
  }
  if (error) {
    return <p>Tasks not loaded, try again</p>
  }
  return <div>{data ? data.map(task => <TaskItem taskData={task}></TaskItem>) : null}</div>
}

export default TaskList
