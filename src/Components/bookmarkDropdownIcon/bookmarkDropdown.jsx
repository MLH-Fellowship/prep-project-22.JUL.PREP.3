import { useContext,useState } from 'react'
import {BsBookmarkHeartFill} from 'react-icons/bs'
import { BookmarkContext } from '../../context/bookmarksApiContext'
import BookmarkDropdown from '../BookmarkDropDown/bookmarkDropDownComponent'

import './bookmamarksDropdownIcon.css'


const BookmarkDropdownIcon = ()=>{

    const [dropdownClicked, setDropDownClicked] = useState(false)
    const {bookmarks} =useContext(BookmarkContext)


    return (
      <>
      <div className='dropdown-icon-container' onClick={()=>setDropDownClicked(!dropdownClicked)}>
          <div className='dropicon'>
            <BsBookmarkHeartFill className='dropdown-icon' style={{cursor: 'pointer'}}/>
            <span className='bookamarked-total'>{bookmarks.length}</span>
          </div>
      </div>
      {
        dropdownClicked && <BookmarkDropdown/>
      }
      </>
    )
}


export default BookmarkDropdownIcon