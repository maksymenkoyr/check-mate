import {useState} from 'react'
const TextArea = ({placeholder}) => {
    const [showPlaceholder, setShowPLaceholder] = useState(true)
    useEffect(() => {
      register({ name: 'name' }, { required: true, maxLength: 75 })
    }, [])
    const handleInput = event => {
        const value = event.target.innerText
        console.log(value)
        console.log(showPlaceholder)
        if (value) {
            return setShowPLaceholder(false)
        }
        setShowPLaceholder(true)
    }
    return (
        <>
            {showPlaceholder ? <div className='placeholder'>{placeholder}</div> : null}
            <div
                onInput={event => handleInput(event)}
                className='editor'
                contentEditable
                aria-label={placeholder}
            ></div>
            <style jsx>
                {`
                    .editor {
                        outline: none;  
                    }
                    .placeholder {
                        position: absolute;
                        pointer-events: none;
                        color: grey;
                    }
                `}
            </style>
        </>
    )
}

export default TextArea
