
import taskModel from '../models/task-model';

export const taskService = {

  addTask: async (userId, taskData) => {
    try {
      return await taskModel.create({ user: userId, name: taskData.name, description: taskData.description, likes: [] })
    } catch (error) {
      console.log(error)
    }
  },

  getAllTasks: async (userId) => {
    return await taskModel.find({ user: userId })

  }


}

export default taskService