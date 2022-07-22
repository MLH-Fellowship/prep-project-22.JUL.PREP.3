import './bookmarkIconStyles.css'
import {BsBookmarkHeartFill} from 'react-icons/bs'
import { useState } from 'react'

const BookmarkIcon= ()=>{
const [isClicked,setIsClicked] =useState(false)

return(
     <BsBookmarkHeartFill className="bookmark-icon" style={{color:isClicked?"rgb(17, 64, 110)":"#333"}} onClick={()=>setIsClicked(!isClicked)}/>
)

}


export default BookmarkIcon