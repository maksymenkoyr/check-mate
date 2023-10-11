import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import UserPreview from './UserPreview'
import Button from '../../components/inputs/Button'
import { authSlice } from '../authentication/authService'

const UserMenu = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const user = useAppSelector(state => state.authReducer.user)
  const dispatch = useAppDispatch()

  if (user) {
    return (
      <>
        <div
          className='container'
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}>
          <UserPreview user={user} />
          {showDropdown ? (
            <div className='dropdown'>
              <Button onClick={() => dispatch(authSlice.actions.logout())}>Log out</Button>
            </div>
          ) : null}
        </div>
        <style jsx>
          {`
            .container {
              position: relative;
            }
            .dropdown {
              position: absolute;
              background-color: white;
              border: 1px solid grey;
              width: 100%;
              z-index: 1;
            }
          `}
        </style>
      </>
    )
  }
}

export default UserMenu
