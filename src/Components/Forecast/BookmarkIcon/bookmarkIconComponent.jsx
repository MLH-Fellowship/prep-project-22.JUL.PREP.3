import './bookmarkIconStyles.css'
import {BsBookmarkHeartFill} from 'react-icons/bs'
import { useState } from 'react'

const BookmarkIcon= ()=>{
const [isClicked,setIsClicked] =useState(false)

return(
     <BsBookmarkHeartFill className="bookmark-icon" style={{color:isClicked?"blue":"#333"}} onClick={()=>setIsClicked(!isClicked)}/>
)

}


export default BookmarkIcon