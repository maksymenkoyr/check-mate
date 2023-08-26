import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import TextInput from '../components/inputs/TextInput'
import Button from '../components/inputs/Button'
import {forms} from '../variables/vocabulary'
import {registerUser} from './authApi'

export interface IRegistrationForm {
    username: string
    email: string
    password: string
}

const AuthForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IRegistrationForm>()
    const onSubmit = data => {
        registerUser(data)
    }
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='header'>
                <h2>{forms.LOGIN_HEADER}</h2>
            </div>
            <div className='text-inputs'>
                <TextInput
                    register={register('username', {required: true})}
                    label={forms.USERNAME}
                    error={errors.username}
                />
                <TextInput register={register('email', {required: true})} label={forms.EMAIL} />
                <TextInput
                    type='password'
                    register={register('password', {required: true})}
                    label={forms.PASSWORD}
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

export default AuthForm
