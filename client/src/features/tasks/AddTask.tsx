import Button from '../../components/inputs/Button'
import TextArea from '../../components/inputs/text-area/TextArea'
import { useRef, useState } from 'react'
import { addTaskAPI } from './taskApi'

const AddTask = ({ finishAddingTask }: { finishAddingTask: () => void }) => {
  const nameValue = useRef<string>(null)
  const descriptionValue = useRef<string>(null)

  const handleSubmit = () => {
    console.log(nameValue.current, descriptionValue.current)
    if (nameValue.current) {
      addTaskAPI({ name: nameValue.current, description: descriptionValue.current })
    }
    finishAddingTask()
  }

  return (
    <>
      <div className='task'>
        <div className='task-content'>
          <div className='task-name'>
            <TextArea placeholder='Name' valueRef={nameValue}></TextArea>
          </div>
          <div className='task-description'>
            <TextArea placeholder='Task description' valueRef={descriptionValue}></TextArea>
          </div>
        </div>
        <Button onClick={handleSubmit}> Add</Button>
      </div>
      <style jsx>
        {`
          .task {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
            padding: 12px;
            width: 100%; /* Adjust the width as needed */
            margin: 20px auto;
          }
          .task-name,
          .task-description {
            width: 100%;
            border: none;

            resize: none;
            font-size: 16px;
            line-height: 1.5;
          }
          .task-description {
            min-height: 50px;
          }
        `}
      </style>
    </>
  )
}

export default AddTask
