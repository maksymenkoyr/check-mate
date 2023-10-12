import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authService";
import { tasksApi } from "../features/tasks/taskService";

const rootReducer = combineReducers({
  authReducer, [tasksApi.reducerPath]: tasksApi.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']