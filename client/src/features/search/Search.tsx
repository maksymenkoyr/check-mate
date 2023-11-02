import { useState } from 'react'
import UserPreview from '../users/UserPreview'
import { useGetAllUsersByNameMutation } from './search-service'
function Search() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [getAllUsersByName, { data, error, isLoading }] = useGetAllUsersByNameMutation()

  const handleInputChange = e => {
    const value = e.target.value
    if (value) {
      setShowDropdown(true)
      getAllUsersByName(value)
    } else {
      setShowDropdown(false)
    }
  }
  return (
    <>
      <div className='search-container'>
        <input
          type='text'
          className='search-input'
          placeholder='Search...'
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
          onFocus={e => {
            e.target.value && setShowDropdown(true)
          }}
        />
        {showDropdown ? (
          <ul className='search-dropdown'>
            search result:
            {isLoading || !data || error ? (
              <p>loading</p>
            ) : (
              data.map(user => <UserPreview user={user} />)
            )}
          </ul>
        ) : null}
      </div>

      <style jsx>
        {`
          .search-container {
            position: relative;
            display: flex;
            align-items: center;
            margin: 10px 0;
          }

          .search-input {
            padding: 10px;
            border: 2px solid #007bff;
            border-radius: 5px;
            font-size: 16px;
            flex-grow: 1;
            outline: none;
          }

          /* Style the input on focus */
          .search-input:focus {
            border-color: #0056b3;
          }
          .search-dropdown {
            position: absolute;
            min-height: 100px;
            width: calc(100% + 10px);
            background-color: white;
            bottom: 0;
            left: 0;
            transform: translateY(100%);
            border: 1px solid lightgrey;
            border-radius: 4px;
            margin: 0;
            padding: 5px;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
        `}
      </style>
    </>
  )
}

export default Search

