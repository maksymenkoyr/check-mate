import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import { authReducer } from "../features/authentication/auth-service";
import { baseApi } from "./api";

const rootReducer = combineReducers({
  authReducer, [baseApi.reducerPath]: baseApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']