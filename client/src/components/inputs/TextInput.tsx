import React from 'react'
import {UseFormRegisterReturn} from 'react-hook-form'
import {colors} from '../../variables/styleVariables'

type InputProps = {
    type?: 'password'
    label: string
    register: UseFormRegisterReturn
    error?: boolean
}

const TextInput = ({type, label, register, error}: InputProps) => {
    return (
        <div>
            <div className='label-wrapper'>
                {label ? <label htmlFor={label}>{label}</label> : null}

                <input id={label} className='input' {...register} type={type} />
            </div>
            <style jsx>
                {`
                    input {
                        width: 100%;
                        height: 25px;
                        max-width: 250px;
                        border-radius: 5px;
                        border: solid 1.5px ${error ? 'red' : colors.ml2};
                    }
                    .label-wrapper {
                        display: flex;
                        flex-direction: column;
                    }
                `}
            </style>
        </div>
    )
}

export default TextInput
