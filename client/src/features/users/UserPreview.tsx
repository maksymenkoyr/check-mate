import { IUser } from './types'

const UserPreview = ({ user }: { user: IUser }) => {
  return (
    <div>
      <p>{user.name}</p>
    </div>
  )
}

export default UserPreview
