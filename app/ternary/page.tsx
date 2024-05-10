'use client'
import { useEffect, useState } from 'react';
import {GETMethod} from '../api/greet/route';


 const Page = () => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const fethData = async ()=>{
            try {
                const response = await GETMethod('https://jsonplaceholder.typicode.com/todos');
                setData(response);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
        fethData();
    },[])
    
  return (
    <main>
    { loading ? (
            <div>Loading...</div>
        ): error ? (
            <div>{error}</div>
        ): (
            data && data.length>0 && data.map((value)=>{

                return <h2>This is a title {value.title}</h2>
            })
        )}    
    </main>
)
 }
export default Page;