import { ITask } from './types'

const TaskItem = ({ taskData }: { taskData: ITask }) => {
  return (
    <div className='task-item'>
      <h2>{taskData.name}</h2>
      <p>{taskData.description}</p>
      <button className='like-button'>Like</button>
      <style jsx>{`
        .task-item {
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px;
          position: relative;
        }

        .task-item h2 {
          font-size: 18px;
          margin: 0;
        }

        .task-item p {
          margin: 0;
        }

        /* Style the "like" button */
        .like-button {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }

        /* Optional hover effect for the "like" button */
        .like-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  )
}

export default TaskItem
