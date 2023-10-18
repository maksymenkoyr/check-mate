import { IUser } from "../users/types";

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
}
export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser
}