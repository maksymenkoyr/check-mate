
import taskModel from '../models/task-model';

export const taskService = {

  addTask: async (userId, { taskName, description, likes }) => {
    await taskModel.create({ user: userId, taskName, description, likes })
  },

  getAllTasks: async (userId) => {
    await taskModel.find({ user: userId })
  }


}

export default taskService