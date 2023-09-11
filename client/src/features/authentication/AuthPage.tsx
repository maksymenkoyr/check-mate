import React from 'react'
import {colors} from '../../variables/styleVariables'
import {Link, Navigate, useLocation} from 'react-router-dom'
import {useAppSelector} from '../../hooks/redux'

const AuthPage = ({
    children,
    userHasAccount = false,
}: {
    children: JSX.Element
    userHasAccount?: boolean
}) => {
    const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
    if (isAuthenticated) {
        return <Navigate to='/'></Navigate>
    }
    return (
        <>
            <div className='wrapper'>
                <div className='container'>
                    {children}
                    <div className='footer'>
                        {userHasAccount ? (
                            <>
                                Don't have account<Link to='../registration'>Sign up</Link>
                            </>
                        ) : (
                            <>
                                Already have and account?<Link to='../login'>Sign in</Link>
                            </>
                        )}
                        <Link to='../registration'></Link>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: ${colors.ml};
                    }
                    .container {
                        padding: 20px;
                        width: 300px;

                        background-color: white;

                        border-radius: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
        </>
    )
}

export default AuthPage
