import api, { API_URL } from '../../utils/api'
import { AxiosResponse } from 'axios';
import { IAuthResponse, ILoginData, IRegistrationData } from './types';

import axios from 'axios';
import { IUser } from '../../utils/types';

export const loginAPI = async ({ email, password }: ILoginData): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>('/login', { email, password })
}

export const registrationAPI = async (data: IRegistrationData): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>('/registration', { ...data })
}

export const logoutAPI = async (): Promise<void> => {
  return await api.post('/logout')
}

export const refreshTokenAPI = async (): Promise<AxiosResponse<IAuthResponse>> => {
  return await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
}
export const authorizeUserAPI = async (): Promise<AxiosResponse<IUser>> => {
  return await axios.get<IUser>(`${API_URL}/auth`, { withCredentials: true })
}



