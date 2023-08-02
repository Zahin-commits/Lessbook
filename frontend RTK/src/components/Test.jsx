import React, { useState } from 'react'
//import { useGetUserDataQuery } from '../features/user/apiSlice'
import { useGetUserDataMutation } from '../features/user/userApiSlice';

const Test = () => {
/*   const {data, isLoading} = useGetUserDataQuery(); 
  console.log(data); */
const [data, setData] = useState('')
  const [getUserData, {isLoading}] = useGetUserDataMutation();
  const getData = async()=>{
    const data = await getUserData().unwrap();
    setData(data)
  console.log(data);
  }

  
  return (
    <div>
      {isLoading ? <h1>Loading...</h1> : <h1>{data}</h1>}
     
    <button onClick={getData}>get data</button>
    </div>
  )
}

export default Test