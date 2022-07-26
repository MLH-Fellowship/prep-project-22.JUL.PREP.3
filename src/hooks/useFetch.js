import { useState, useEffect } from "react";

const useFetch = (autoCompleteURL) => {
  // ..
  const [suggestions, setSuggestions] = useState({
    cityPrefix: "",
    results: [],
  });
  useEffect(() => {
    
      const timeoutId = setTimeout(() => {
        const getCities = async ()=>{
          try {
            
            const query = `q=${suggestions.cityPrefix}&limit=10&types=city&apiKey=${process.env.REACT_APP_AUTOCOMPLETE_APIKEY}`;
            fetch(`${autoCompleteURL}${query}`).then((res)=>res.json()).then((result)=>{

            setSuggestions({ ...suggestions, results:  result.items});
            })
          } catch (err) {
            alert(err.message);
          }
        }
        getCities();
      }, 1000);
      return () => clearTimeout(timeoutId);
    
  }, [suggestions.cityPrefix]);

  return { suggestions, setSuggestions };
};

export default useFetch;
