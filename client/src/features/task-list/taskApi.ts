import { AxiosResponse } from "axios"
import api from "../../utils/api"
import { ITask } from "./types"

export const getTasksAPI = async (): Promise<AxiosResponse<ITask[]>> => {
  return await api.get('/tasks')
}

type taskData = {
  name: string;
  description: null|string;
}
export const addTaskAPI = async (taskData: taskData): Promise<AxiosResponse<ITask>> => {
  return await api.post('/tasks/add-task', taskData)
}