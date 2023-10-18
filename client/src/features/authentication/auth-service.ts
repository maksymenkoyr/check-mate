import { createSlice } from '@reduxjs/toolkit'
import { IAuthResponse, ILoginData, IRegistrationData } from "./types";
import { IUser } from '../users/types';
import { baseApi } from '../../store/api';

interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('token')
    },
    authenticate: (state, { payload }: { payload: IAuthResponse }) => {
      state.isAuthenticated = true
      state.user = payload.user
    }

  },
})

export const { reducer: authReducer } = authSlice
export const { logout } = authSlice.actions

export const authApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Auth']
  })
  .injectEndpoints({
    endpoints: builder => ({
      login: builder.mutation<IAuthResponse, ILoginData>({
        query: ({ email, password }) => ({ url: 'auth/login', method: "POST", body: { email, password } }),
        invalidatesTags: ['Auth'],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            const { data } = await queryFulfilled
            localStorage.setItem('token', data.accessToken)
            dispatch(authSlice.actions.authenticate(data))
          } catch (err) {
            console.log(err)
          }
        },
      }),
      register: builder.mutation<IAuthResponse, IRegistrationData>({
        query: ({ name, email, password }) => ({ url: 'auth/register', method: "POST", body: { name, email, password } }),
        invalidatesTags: ['Auth'],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            const { data } = await queryFulfilled
            dispatch(authSlice.actions.authenticate(data))
            localStorage.setItem('token', data.accessToken)
          } catch (err) {
            console.log(err)
          }
        },

      }),
      authenticate: builder.mutation<IAuthResponse, void>({
        query: () => ('/auth'),
        invalidatesTags: ['Auth'],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            const { data } = await queryFulfilled
            dispatch(authSlice.actions.authenticate(data))
          } catch (err) {
            console.log(err)
          }
        },

      }),

    }),

  })

export const { useLoginMutation, useRegisterMutation, useAuthenticateMutation } = authApi