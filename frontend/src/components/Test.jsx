import React, { useState } from 'react'
import { useGetAuthorDataQuery, useGetAuthorInfoMutation } from '../features/user/userApiSlice'
import { useGetAllPost2Query } from '../features/posts/postsApiSlice';
//import { useGetUserDataQuery } from '../features/user/apiSlice'

//import { useGetUserDataMutation } from '../features/user/userApiSlice';

const Test = () => {

/*   const {data, isLoading} = useGetUserDataQuery(); 
  console.log(data); */
//const [data, setData] = useState('')
 // const [getUserData, {isLoading}] = useGetUserDataMutation();
 /*  const getData = async()=>{
    const data = await getUserData().unwrap();
    setData(data)
  console.log(data);
  } */

 // const {data,isLoading} = useGetAuthorDataQuery('64cbed1621a30d0d087fbd0d');

// const [aothorInfo,setAuthorInfo] = useState('');
// const [getAuthorInfo,{isLoading}] = useGetAuthorInfoMutation();
 
const getData = ()=>{
  //  const userId = post.userId;

     const res = getAuthorInfo('64cbed1621a30d0d087fbd0d').unwrap().then((data,error)=>{
      if(data){
      console.log(data);
      setAuthorInfo(data);
      } 
    });
     
 //const {data,isLoading} = useGetAuthorDataQuery(userId);
}

 const {data,isLoading}  = useGetAllPost2Query();
 console.log(data);
 
  return (
    <div>
      {!isLoading && <h1>{data?.post[0]?.desc}</h1>}
      <button onClick={getData}>get data</button>
    </div>
  )
}

export default Test