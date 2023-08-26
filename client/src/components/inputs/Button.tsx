import React from 'react'
import {colors} from '../../variables/styleVariables'

const Button = ({children}: {children: string}) => {
    return (
        <>
            <button>{children}</button>
            <style jsx>
                {`
                    button {
                        width: 100%;
                        max-width: 250px;
                        border: none;
                        height: 25px;
                        border-radius: 5px;
                        background-color: ${colors.md};
                        color: ${colors.ml};
                    }
                `}
            </style>
        </>
    )
}

export default Button
