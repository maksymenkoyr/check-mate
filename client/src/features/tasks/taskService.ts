import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from './types';
import { API_URL } from '../../utils/api';
import { baseQueryWithAuth } from '../../utils/queries';

interface TasksState {
  isLoading: boolean;
  tasks: null | ITask[];
  error: null | string[]
}

const initialState: TasksState = {
  isLoading: false,
  tasks: null,
  error: null
}



// export const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementBy, (state, action) => {
//         // action is inferred correctly here if using TS
//       })
//       // You can chain calls, or have separate `builder.addCase()` lines each time
//       .addCase(decrement, (state, action) => { })
//       // You can match a range of action types
//       .addMatcher(
//         isRejectedAction,
//         // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
//         (state, action) => { }
//       )
//       // and provide a default case if no other handlers matched
//       .addDefaultCase((state, action) => { })
//   },
// })


export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: baseQueryWithAuth('/tasks'),
  endpoints: (builder) => ({
    getAllTasks: builder.query<ITask[], string>({
      query: (userId) => ({ url: '/', params: { userId } }),
    }),
  }),

})




