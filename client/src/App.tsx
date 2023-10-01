import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import {Navigate} from 'react-router-dom'
import {startSession} from './features/authentication/authService'
import TaskList from './features/task-list/TaskList'
import TaskView from './features/task-list/TasksView'

function App() {
    const {isAuthenticated} = useAppSelector(state => state.authReducer)
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }
    return <TaskView />
}

export default App

