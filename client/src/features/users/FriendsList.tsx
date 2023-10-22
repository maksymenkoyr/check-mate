import UserPreview from './UserPreview'
import { useGetAllFriendsQuery } from './user-service'

const FriendList = () => {
  const { data, isLoading, isSuccess } = useGetAllFriendsQuery()
  if (isLoading) {
    return 'loading'
  }
  if (isSuccess) {
    console.log(data)
    return (
      <div className='friend-list'>
        {data.map(friend => (
          <UserPreview user={friend} />
        ))}

        <style jsx>
          {`
            .friend-list {
              display: flex;
              flex-direction: column;
              gap: 5px;
            }
          `}
        </style>
      </div>
    )
  }
  return 'error'
}

export default FriendList
