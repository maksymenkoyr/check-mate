import React from 'react'
import RegistrationForm from './RegistrationForm'
import {colors} from '../variables/styleVariables'

const AuthPage = () => {
    return (
        <>
            <div className='wrapper'>
                <div className='container'>
                    <RegistrationForm />
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
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
        </>
    )
}

export default AuthPage
