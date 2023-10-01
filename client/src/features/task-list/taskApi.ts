import { AxiosResponse } from "axios"
import api from "../../utils/api"
import { ITask } from "./types"

export const getTasksAPI = async (): Promise<AxiosResponse<ITask[]>> => {
  return await api.get('/tasks')
}
export const addTaskAPI = async (taskData: ITask): Promise<AxiosResponse<ITask>> => {
  return await api.post('/tasks', taskData)
}