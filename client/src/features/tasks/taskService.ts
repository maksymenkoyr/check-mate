import { ITask, ITaskCreatingData } from './types';
import { baseApi } from '../../store/api';


export const tasksApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Tasks']
  })
  .injectEndpoints({
    endpoints: builder => ({
      getAllTasks: builder.query<ITask[], string>({
        query: userId => ({ url: '/tasks', params: { userId } }),
        providesTags: ['Tasks'],
      }),
      addTask: builder.mutation<ITask, ITaskCreatingData>({
        query: taskData => ({ url: '/tasks', method: 'POST', body: taskData }),
        invalidatesTags: ['Tasks']
      })
    }),

  })



export const {
  useAddTaskMutation, useGetAllTasksQuery
} = tasksApi




