import { AxiosResponse } from "axios"
import api from "../../utils/api"
import { ITask } from "./types"

export const getTasksAPI = async (userId: string): Promise<AxiosResponse<ITask[]>> => {
  return await api.get('/tasks', { params: { userId } })
}

type taskData = {
  name: string;
  description: null | string;
}
export const addTaskAPI = async (taskData: taskData): Promise<AxiosResponse<ITask>> => {
  return await api.post('/tasks/add-task', taskData)
}