import { useParams } from 'react-router-dom'
import TasksView from '../tasks/TasksView'
import { useAppSelector } from '../../hooks/redux'
import UserPreview from './UserPreview'
import { useAddFriendMutation, useGetUserQuery } from './user-service'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import Button from '../../components/inputs/Button'

const UserView = () => {
  const displayedUserId = useParams().userId!
  const user = useAppSelector(state => state.authReducer.user)
  console.log(user)

  const isCurrentUser = displayedUserId === user._id
  const { data, isLoading } = useGetUserQuery(isCurrentUser ? skipToken : displayedUserId)
  const [addFriend] = useAddFriendMutation()
  return (
    <>
      <div className='header'>
        {isCurrentUser ? null : (
          <>
            <UserPreview mediumSize user={data} />
            {data?.isFriend ? (
              <Button
                onClick={() => {
                  removeFriend(displayedUserId)
                }}>
                stop being friends
              </Button>
            ) : (
              <Button
                onClick={() => {
                  addFriend(displayedUserId)
                }}>
                Be friends
              </Button>
            )}
          </>
        )}
      </div>
      <TasksView isCurrentUser={isCurrentUser} userId={displayedUserId} />
      <style jsx>
        {`
          .displayed-user-information {
            min-height: 50px;
          }
          .header {
            display: flex;
            justify-content: space-between;
          }
        `}
      </style>
    </>
  )
}

export default UserView


