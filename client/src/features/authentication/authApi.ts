import api, { API_URL } from '../../utils/api'
import { AxiosResponse } from 'axios';
import { IAuthResponse, ILoginData, IRegistrationData } from './types';

import axios from 'axios';

export const loginAPI = ({ email, password }: ILoginData): Promise<AxiosResponse<IAuthResponse>> => {
  return api.post<IAuthResponse>('/login', { email, password })
}

export const registrationAPI = async (data: IRegistrationData): Promise<AxiosResponse<IAuthResponse>> => {
  return api.post<IAuthResponse>('/registration', { ...data })
}

export const logoutAPI = async (): Promise<void> => {
  return api.post('/logout')
}

export const refreshTokenAPI = async (): Promise<AxiosResponse<IAuthResponse>> => {
  return await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
}

