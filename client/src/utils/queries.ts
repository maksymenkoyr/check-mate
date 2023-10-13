import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { API_URL } from "./api";

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
      url: '/refresh',
    }, api, extraOptions)
    if (refreshResult.data?.refreshToken) {
      localStorage.setItem('token', refreshResult.data.refreshToken);
      result = await baseQuery(args, api, extraOptions)

    }
  }
  return result
}
