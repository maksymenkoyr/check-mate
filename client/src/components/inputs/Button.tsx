import React from 'react'
import {colors} from '../../variables/styleVariables'

const Button = ({children, onClick}: {children: string, onClick: () => void}) => {
    return (
        <>
            <button onClick={onClick}>{children}</button>
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
