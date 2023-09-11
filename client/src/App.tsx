import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import {Navigate} from 'react-router-dom'
import {startSession} from './features/authentication/authService'
import TaskList from './features/task-list/TaskList'

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(startSession())
    })
    const {isAuthenticated} = useAppSelector(state => state.authReducer)
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }
    return <TaskList />
}

export default App

