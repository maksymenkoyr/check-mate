import { useState } from 'react'
import TaskList from './TaskList'
import AddTask from './AddTask'
import { Button } from '@mui/material'

const TasksView = ({ userId, isCurrentUser }: { userId: string; isCurrentUser: boolean }) => {
  const [addTask, setAddTask] = useState<boolean>(false)

  return (
    <>
      {addTask ? <AddTask finishAddingTask={() => setAddTask(false)} /> : null}
      <TaskList userId={userId} />
      {isCurrentUser ? (
        <Button variant='contained' onClick={() => setAddTask(true)}>
          {' '}
          AddTask{' '}
        </Button>
      ) : null}
    </>
  )
}

export default TasksView
