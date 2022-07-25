import { useState, useEffect } from "react";

const useFetch = (autoCompleteURL) => {
  // ..
  const [data, setData] = useState({
    cityPrefix: "",
    results: [],
  });
  // const autoCompleteURL = "https://autocomplete.search.hereapi.com/v1/autocomplete?";
  useEffect(() => {
    
      const timeoutId = setTimeout(() => {
        const getCities = async ()=>{
          try {
            
            const query = `q=${data.cityPrefix}&limit=10&types=city&apiKey=${process.env.REACT_APP_AUTOCOMPLETE_APIKEY}`;
            fetch(`${autoCompleteURL}${query}`).then((res)=>res.json()).then((result)=>{

            setData({ ...data, results:  result.items});
            })
          } catch (err) {
            alert(err.message);
          }
        }
        getCities();
      }, 1000);
      return () => clearTimeout(timeoutId);
    
  }, [data.cityPrefix]);

  return { data, setData };
};

export default useFetch;
