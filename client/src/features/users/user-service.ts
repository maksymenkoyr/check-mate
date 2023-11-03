import { IUser } from '../users/types';
import { baseApi } from '../../store/api';


export const usersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['Users', 'Friends']
  })
  .injectEndpoints({
    endpoints: builder => ({
      getUser: builder.query<IUser, string>({
        query: (userId) => ({ url: 'users/', params: { userId } }),
        providesTags: ['Users'],
      }),
      addFriend: builder.mutation<void, string>({
        query: (friendId) => ({ url: 'users/add-friend', method: "PATCH", body: { friendId } }),
        invalidatesTags: ['Friends']
      }),
      removeFriend: builder.mutation<void, string>({
        query: (friendId) => ({ url: 'users/remove-friend', method: "PATCH", body: { friendId } }),
        invalidatesTags: ['Friends']
      }),
      getAllFriends: builder.query<IUser[], void>({
        query: () => ({ url: 'users/friends' }),
        providesTags: ['Friends']
      })

    })
  })

export const { useGetAllFriendsQuery, useGetUserQuery, useAddFriendMutation, useRemoveFriendMutation } = usersApi