import React from 'react'
import {useForm} from 'react-hook-form'
import TextInput from '../../components/inputs/TextInput'
import Button from '../../components/inputs/Button'
import {forms} from '../../variables/vocabulary'
import {authSlice, loginUser} from './authService'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {ILoginData} from './types'

export interface LoginForm {
    email: string
    password: string
}
const LoginForm = () => {
    const dispatch = useAppDispatch()
    // const auth = useAppSelector(state => state.authReducer)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginForm>()
    const onSubmit = (data: ILoginData) => {
        dispatch(loginUser(data))
    }
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='header'>
                <h2>{forms.LOGIN_HEADER}</h2>
            </div>
            <div className='text-inputs'>
                <TextInput
                    register={register('email', {
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    })}
                    label={forms.EMAIL}
                    error={errors.email}
                />
                <TextInput
                    type='password'
                    register={register('password', {required: true})}
                    label={forms.PASSWORD}
                    error={errors.password}
                />
            </div>
            <div className='submit'>
                <Button>submit</Button>
            </div>

            <style jsx>
                {`
                    .form {
                        width: 250px;
                    }
                    .text-inputs {
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                        gap: 5px;
                    }
                    .submit {
                        padding-top: 30px;
                    }
                `}
            </style>
        </form>
    )
}

export default LoginForm
