import { useState, useEffect } from 'react'
import { searchUserByName } from './searchApi'
import { IUser } from '../users/types'
import UserPreview from '../users/UserPreview'
function Search() {
  const [results, setResults] = useState<IUser[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  const handleInputChange = e => {
    setShowDropdown(true)
    const value = e.target.value
    searchUserByName(value).then(res => setResults(res.data))
  }

  return (
    <>
      <div className='search-container'>
        <input
          type='text'
          className='search-input'
          placeholder='Search...'
          onChange={handleInputChange}
          onBlur={() => setShowDropdown(false)}
          onFocus={() => setShowDropdown(true)}
        />
        {showDropdown ? (
          <ul className='search-dropdown'>
            {results.map(user => (
              <UserPreview user={user} />
            ))}
          </ul>
        ) : null}
      </div>

      <style jsx>
        {`
          .search-container {
            position: relative;
            display: flex;
            align-items: center;
            margin: 10px;
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
            width: 100%;
            background-color: white;
            bottom: 0;
            left: 0;
            transform: translateY(100%);
            border: 1px solid lightgrey;
            margin: 0;
            padding: 0;
            z-index: 1;
          }
        `}
      </style>
    </>
  )
}

export default Search
