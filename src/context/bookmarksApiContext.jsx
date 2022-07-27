import { createContext, useReducer } from "react";


//utility functions
const addBookmark = (newBoomark, bookmarks)=>{
   const isBookmarkPresent = bookmarks.find(bookmark=> bookmark.name === newBoomark.name);
   if(isBookmarkPresent) {
    console.log('yes')
    return bookmarks
   }//bookmark already present
   return [...bookmarks, newBoomark]
}

//remove bookmark function
const removeBookmark = (removedBookmark, bookmarks)=>{
    const isBookmarkPresent = bookmarks.find(bookmark=> bookmark.name === removedBookmark.name);
    if(!isBookmarkPresent) return bookmarks //confirm the bookmark is there before removing
    return bookmarks.filter(bookmark=> bookmark.name !== removedBookmark.name);
}

//reducer for state management
const reducer = (state,action)=>{

const {type,payload} = action;

  switch (type) {
    case 'create':
        return addBookmark(payload, state)
    case 'remove':
        return removeBookmark(payload, state);
    default:
        return state
  }
}

export const BookmarkContext = createContext([])


const BookmarkProvider = ({children})=>{
    const [bookmarks, dispatch ] = useReducer(reducer,[])
return (
    <BookmarkContext.Provider value={{bookmarks,dispatch}}>{children}</BookmarkContext.Provider>
)
}   


export default BookmarkProvider

