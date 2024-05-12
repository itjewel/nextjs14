'use client'
import { useEffect, useState } from 'react'
import {GETMethod} from '../api/greet/route'

  export default  function Page() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const responseData = await GETMethod('https://jsonplaceholder.typicode.com/todos');
                setData(responseData);
                setLoading(false)
            } catch (error) {
                setLoading(false);
                setError(error.message)
                if(error instanceof Error) console.log(error.message)
                
            }
        }
        fetchData();
    },[])
   
    if(error){
        return <div>Error: {error.message}</div>
    }
    if(loading){
        return <div>Loading...</div>
    }
    if(!data && data.length === 0){
      return <div>No data available!</div>
    }

    return <main>
       {data && data.length > 0 && (
        data.map((value) => (
          <h3 key={value.id}>{value.title}</h3>
        ))
      )}
    </main>
  }