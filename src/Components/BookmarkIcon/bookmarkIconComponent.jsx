import './bookmarkIconStyles.css'
import {BsBookmarkHeartFill} from 'react-icons/bs'
import { useContext } from 'react'
import { BookmarkContext } from '../../context/bookmarksApiContext'



const BookmarkIcon= ({isClicked,changeIconsColor,results})=>{
   const {bookmarks,dispatch} = useContext(BookmarkContext)

   const changeOnClick =()=>{
   
    if(isClicked){
        dispatch({
            type:'remove',
            payload:results
        })
    }else{
        dispatch({
            type:'create',
            payload:results
        })
    }
   changeIconsColor()
   }

return(
    <>
     <BsBookmarkHeartFill className="bookmark-icon" style={{color:isClicked?"blue":"#333"}} onClick={changeOnClick}/>
    </>
)
}


export default BookmarkIcon