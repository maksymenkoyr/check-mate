import { IUser } from './types'
import avatar from '../../assets/default-avatar.jpg'
import { Link } from 'react-router-dom'

const UserPreview = ({ user }: { user: IUser }) => {
  return (
    <>
      <Link to={`/${user._id}`} onClick={() => console.log('click')}>
        <div className='container'>
          <div className='avatar'>
            <img src={avatar} alt='Circular Image' style={{ width: '100%' }} />
          </div>
          <p>{user.name}</p>
        </div>
      </Link>
      <style jsx>
        {`
          .container {
            display: flex;
            width: 120px;
            height: 40px;
            border: 1px solid grey;
            border-radius: 10px;
            display: flex;
            cursor: pointer;
          }
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
        `}
      </style>
    </>
  )
}

export default UserPreview
