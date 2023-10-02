import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import {Navigate} from 'react-router-dom'
import {startSession} from './features/authentication/authService'
import TaskList from './features/tasks/TaskList'
import TaskView from './features/tasks/TasksView'

function App() {
    const {isAuthenticated} = useAppSelector(state => state.authReducer)
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }
    return <TaskView />
}

export default App

