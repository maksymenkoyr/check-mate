import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import taskService from '../services/task-service';
export const addTask = async (req, res, next) => {
  try {
    const taskData = req.body
    const userId = req.user._id
    const task = await taskService.addTask(userId, taskData)
    return res.status(200).json(task)
  } catch (error) {
    next(error)
  }
}
export const getAllTasks = async (req, res, next) => {
  try {

    const userId = req.user._id
    const allTasks = taskService.getAllTasks(userId)
    res.status(200).json(allTasks)
  } catch (error) {
    next(error)
  }
}

export const taskRouter = Router()

taskRouter.use(authMiddleware)
taskRouter.get('/', getAllTasks)
taskRouter.post('/add-task', addTask)





