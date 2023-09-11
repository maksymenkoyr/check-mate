import api from "../../utils/api"

export const getTasksAPI = (): Promise<AxiosResponse<>> => {
  return api.post('/tasks')
}