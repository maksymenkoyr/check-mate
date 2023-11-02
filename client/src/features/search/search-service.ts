import { IUser } from "../users/types"
import { baseApi } from "../../store/api"

export const searchApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['SearchResult'] })
  .injectEndpoints({
    endpoints: builder => ({
      getAllUsersByName: builder.mutation<IUser[], string>({
        query: name => ({ url: '/search', method: 'GET', params: { name } }),
        invalidatesTags: ['SearchResult'],
      }),
    }),

  })

export const {
  useGetAllUsersByNameMutation,
} = searchApi