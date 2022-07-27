import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Loader from './Components/initialLoader/initialLoaderComp';

const WeatherApp = ()=>{

  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{

     setTimeout(()=>{
      setIsLoading(false)
     },3500)

  },[])
  
  return(<>
        {isLoading? <Loader/> : <App/>}
         </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>,
  document.getElementById('root')
);
