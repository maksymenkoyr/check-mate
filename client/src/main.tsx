import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import AuthPage from './features/authentication/AuthPage.tsx'
import {Provider} from 'react-redux'
import {setupStore} from './store/store.ts'
import RegistrationForm from './features/authentication/RegistrationForm.tsx'
import LoginForm from './features/authentication/LoginForm.tsx'
import App from './App.tsx'
import Root from './Root.tsx'

const store = setupStore()

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {path: '/', element: <App />},
            {
                path: 'login/',
                element: (
                    <AuthPage userHasAccount>
                        <LoginForm />
                    </AuthPage>
                ),
            },
            {
                path: 'registration/',
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
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)

