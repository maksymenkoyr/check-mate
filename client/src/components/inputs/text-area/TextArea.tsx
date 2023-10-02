import { useState } from 'react'
import Button from '../Button'
const TextArea = ({ placeholder, valueRef }) => {
  const [showPlaceholder, setShowPLaceholder] = useState(true)

  const handleInput = event => {
    const value = event.target.innerText
    console.log(value)

    if (!value) {
      return setShowPLaceholder(true)
    }
    setShowPLaceholder(false)
    valueRef.current = value
  }
  return (
    <>
      {showPlaceholder ? <div className='placeholder'>{placeholder}</div> : null}
      <div
        onInput={event => handleInput(event)}
        className='editor'
        contentEditable
        aria-label={placeholder}></div>
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
