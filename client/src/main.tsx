import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthPage from './features/authentication/AuthPage.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './store/store.ts'
import RegistrationForm from './features/authentication/RegistrationForm.tsx'
import LoginForm from './features/authentication/LoginForm.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import UserView from './features/users/UserView.tsx'
import AppRoot from './AppRoot.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { colors } from './utils/colors.ts'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'

const store = setupStore()

const theme = createTheme({
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            background: colors.background,
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            border: `1.5px solid ${colors.primary.main}`,
          },
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary.main,
      contrastText: colors.primary.contrastText,
    },
    background: {
      default: colors.background,
      paper: colors.surfaces,
    },
  },
})

const router = createBrowserRouter([
  {
    element: <AppRoot />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: ':userId',
            element: <UserView />,
          },
        ],
      },
      {
        path: '/login',
        element: (
          <AuthPage userHasAccount>
            <LoginForm />
          </AuthPage>
        ),
      },
      {
        path: '/registration',
        element: (
          <AuthPage>
            <RegistrationForm />
          </AuthPage>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)

