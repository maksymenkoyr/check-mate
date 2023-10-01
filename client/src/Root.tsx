import {useEffect} from 'react'

import {startSession} from './features/authentication/authService'
import {useAppDispatch} from './hooks/redux'
import {Outlet} from 'react-router-dom'

const Root = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(startSession())
    }, [])
    return <Outlet />
}

export default Root
