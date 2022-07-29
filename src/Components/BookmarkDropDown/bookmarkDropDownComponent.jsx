import { useContext } from 'react'
import { BookmarkContext } from '../../context/bookmarksApiContext'
import './bookmarkDropdown.css'


const BookmarkDropdown = ()=>{

    const {bookmarks} = useContext(BookmarkContext)


    return (
       
    <div className="bookmark-container">{
        bookmarks.length > 0? (
            bookmarks.map(results=>(
            <div className="bookmark-field">
                <p className="bookmark-description">
                    <span className="bookmark-location"> {results.name}, {results.sys.country} </span>
                    <span className="bookmark-temperature">{results.main.feels_like}<sup>0</sup>C</span>
                    <span className="bookmark-condition">{results.weather[0].main}</span>
                </p>
            </div>))
            )
     :<p className='empty-bookmarks'>You have no bookmarks</p>
          }
        </div>
    )
}


export default BookmarkDropdown