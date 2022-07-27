import { useContext, useEffect, useState } from 'react'
import { BookmarkContext } from '../../context/bookmarksApiContext'


import AQIPollution from '../AQIPollutionRate/AQIPollution'
import BookmarkIcon from "../BookmarkIcon/bookmarkIconComponent"



import './ResultStyles.css'



const Result = ({results,barColor,airQualityValue,airQualityDesc,airQualityIndex})=>{
    const [isClicked,setIsClicked] =useState(false)
    const {bookmarks} = useContext(BookmarkContext)

    useEffect(()=>{
        setIsClicked(false)
       const isResultPresent =  bookmarks.find(bookmark => bookmark.name === results.name) //find if new result is already bookmarked

       if (isResultPresent) setIsClicked(true); //if so set the icon to clicked

    },[results])

    const changeIconsColor = () =>{
        setIsClicked(!isClicked)
    }

return(
    <>
        <h3 className="result_title">{results.weather[0].main} <BookmarkIcon isClicked={isClicked} results={results} changeIconsColor={changeIconsColor}/> </h3>
        <p className="result_description">Feels like <span>{results.main.feels_like}°C</span></p>
        <p className="result_description"><span className="result_country">{results.name},{results.sys.country}</span></p>
        {airQualityValue && (
        <AQIPollution
        airQualityIndex={airQualityIndex}
        airQualityValue={airQualityValue}
        airQualityDesc={airQualityDesc}
        barColor={barColor}/>)}
  </>
  )
}

export default Result;