import axios from "axios";
import { useState , useEffect } from "react";

const useFetch = () =>{
    // ..
    const [data,setData] = useState({
        cityPrefix : "New",
        results : []
    });

    useEffect(() => {
        if(data.cityPrefix !== ""){
            const timeoutId = setTimeout(()=>{
                const fetch = async()=>{
                    try{
                        const options = {
                            method: 'GET',
                            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
                            params: {namePrefix: data.cityPrefix, limit: '10'},
                            headers: {
                              'X-RapidAPI-Key': '16793b670bmsh708b19b6b68a92ap1c4a73jsne79ccfed1616',
                              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                            }
                        };
                        const res = await axios.request(options);
                        console.log(res);
                        setData({...data,results:res.data.data});
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                };
                fetch();
            },1000);
            return ()=> clearTimeout(timeoutId);
        }

    }, [data.cityPrefix]);

    return {data , setData };
}

export default useFetch;