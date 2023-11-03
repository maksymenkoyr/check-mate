import { IUser } from './types'
import avatar from '../../assets/default-avatar.jpg'
import { Link } from 'react-router-dom'
import { colors } from '../../utils/colors'

const UserPreview = ({ user, mediumSize = false }: { user: IUser; mediumSize?: boolean }) => {
  return (
    <>
      <Link
        to={`/${user?._id}`}
        onClick={() => console.log('click')}
        style={{ color: 'inherit', textDecoration: 'inherit' }}>
        <div className='container'>
          <div className='avatar'>
            <img src={avatar} alt='Circular Image' style={{ width: '100%' }} />
          </div>
          <p>{user?.name}</p>
        </div>
      </Link>
      <style jsx>
        {`
          .container {
            display: flex;
            padding-left: 5px;
            padding-right: 10px;
            height: 50px;
            width: ${mediumSize ? '200px' : '100%'};
            background: ${colors.surfaces};
            border: 0.5px solid ${colors.border};
            border-radius: 4px;
            cursor: pointer;
            transition: transform 0.3s;
            transition: background-color 0.3s;
            align-items: center;
            justify-content: space-between;
          }
          .container:hover {
            background: ${colors.surfacesHover};
            transform: scale(1.01);
          }
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
          a {
            color: ${colors.primary.contrastText};
            text-decoration: none;
          }
        `}
      </style>
    </>
  )
}

export default UserPreview

