
import taskModel from '../models/task-model';

export const taskService = {

  addTask: async (userId, taskData) => {
    console.log(userId)
    try {

      return await taskModel.create({ user: userId, name: taskData.name, description: taskData.description, likes: [] })
    } catch (error) {
      console.log(error)
    }
  },

  getAllTasks: async (userId) => {
    await taskModel.find({ user: userId })
  }


}

export default taskService