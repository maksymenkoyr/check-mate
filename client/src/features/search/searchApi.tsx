import { AxiosResponse } from 'axios'
import api from '../../utils/api'
import { IUser } from '../users/types'

export const searchUserByName = async (name: string): Promise<AxiosResponse<IUser[]>> => {
  return await api.get('/users', {params: {name}})
}


