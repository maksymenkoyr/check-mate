import TextArea from '../../components/inputs/text-area/TextArea'
import { useState } from 'react'

const AddTask = ({finishAddingTask}:{finishAddingTask: () => void}) => {
  return (
    <>
      <div className='task'>
        <div className='task-content'>
          <div className='task-title'>
            <TextArea placeholder='Title'></TextArea>
          </div>
          <div className='task-description'>
            <TextArea placeholder='Task description'></TextArea>
          </div>
        </div>
        <style jsx>
          {`
            .task {
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
              padding: 12px;
              width: 300px; /* Adjust the width as needed */
              margin: 20px auto;
            }
            .task-title,
            .task-description {
              width: 100%;
              border: none;

              resize: none;
              font-size: 16px;
              line-height: 1.5;
            }
            .task-description {
              min-height: 100px;
            }
          `}
        </style>
      </div>
    </>
  )
}

export default AddTask
