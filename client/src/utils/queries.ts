import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


export const API_URL = `http://localhost:3001/api`

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    return headers
  }

})

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({
      url: '/auth/refresh',
    }, api, extraOptions)
    if (refreshResult.data?.accessToken) {
      localStorage.setItem('token', refreshResult.data.accessToken);
      result = await baseQuery(args, api, extraOptions)

    }
  }
  return result
}
