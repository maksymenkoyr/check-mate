import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { API_URL } from "./api";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
})

export const baseQueryWithAuth: (baseUrl: string) => BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = (baseUrl) => async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_URL.concat(baseUrl),
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      return headers
    }

  })
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({
      url: '/refresh',
    }, api, extraOptions)
    if (refreshResult.data?.refreshToken) {
      localStorage.setItem('token', refreshResult.data.refreshToken);
      result = await baseQuery(args, api, extraOptions)

    }
  }
  return result
}
