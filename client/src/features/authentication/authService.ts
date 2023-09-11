import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { loginAPI, refreshTokenAPI, registrationAPI } from "./authApi";
import { IAuthResponse, ILoginData, ILoginResponse, IRegistrationData } from "./types";
import { IUser } from "../../utils/types";
import axios from 'axios';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  error: null | string
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: ILoginData, { rejectWithValue }) => {
    try {
      const response = await loginAPI({ ...data })
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (e) {
      return rejectWithValue(" authentication request was rejected")
    }
  }
)
export const registerUser = createAsyncThunk(
  'auth/login',
  async (data: IRegistrationData, { rejectWithValue }) => {
    try {
      const response = await registrationAPI({ ...data })
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (e) {
      return rejectWithValue(" authentication request was rejected")
    }
  }
)

export const startSession = createAsyncThunk(
  'auth/startSession',
  async (_data, { rejectWithValue }) => {
    try {
      const response = await refreshTokenAPI()
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(" authentication request was rejected")
    }
  })


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    }

  },
  extraReducers: {



    [loginUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<ILoginResponse>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.error = action.payload
    },
    [startSession.fulfilled.type]: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
    }
  }
})

export default authSlice.reducer
export const authActions = authSlice.actions



