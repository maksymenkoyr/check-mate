import { createApi } from '@reduxjs/toolkit/query/react'
import { ITask, ITaskCreatingData } from './types';
import { baseQueryWithAuth } from '../../utils/queries';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: baseQueryWithAuth('/tasks'),
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    getAllTasks: builder.query<ITask[], string>({
      query: userId => ({ url: '', params: { userId } }),
      providesTags: ['Tasks'],
    }),
    addTask: builder.mutation<ITask, ITaskCreatingData>({
      query: taskData => ({ url: '', method: 'POST', body: taskData }),
      invalidatesTags: ['Tasks']
    })
  }),

})

export const {
  useAddTaskMutation,
  useGetAllTasksQuery
} = tasksApi




