import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import taskService from '../services/task-service';
export const addTask = async (req, res) => {
  const taskData = req.body
  const userId = req.user._id
  const task = taskService.addTask(userId, taskData)
  return task
}
export const getAllTasks = async (req, res) => {
  try {

    console.log(req)
    const userId = req.user._id
    const allTasks = taskService.getAllTasks(userId)
    res.status(200).json(allTasks)
  } catch (error) {
    next(e)
  }
}

export const taskRouter = Router()

taskRouter.use(authMiddleware)
taskRouter.get('/', getAllTasks)
taskRouter.post('/add-task', addTask)





