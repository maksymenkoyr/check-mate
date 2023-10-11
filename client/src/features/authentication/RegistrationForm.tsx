import React from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../../components/inputs/TextInput'
import Button from '../../components/inputs/Button'
import { forms } from '../../variables/vocabulary'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IRegistrationData } from './types'
import { registerUser } from './authService'

const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.authReducer)
  console.log(auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationData>()
  const onSubmit = (data: IRegistrationData) => {
    dispatch(registerUser({ ...data }))
  }
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='header'>
        <h2>{forms.REGISTRATION_HEADER}</h2>
      </div>
      <div className='text-inputs'>
        <TextInput
          register={register('name', { required: true })}
          label={'Name'}
          error={errors.name}
        />
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
          register={register('password', { required: true })}
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

export default RegistrationForm
