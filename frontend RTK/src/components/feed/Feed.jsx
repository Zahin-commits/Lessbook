import './feed.css';
import React, { useEffect, useState } from 'react'
import { useGetAllPostQuery, useGetPostsDataMutation } from '../../features/user/userApiSlice'
import { Post } from '../post/Post';
import PostMaker from '../postMaker/PostMaker';


export const Feed = () => {

const [posts,setPosts] = useState([]);
//const [getPostsData,{isLoading}] = useGetPostsDataMutation();
 const {isLoading,data} = useGetAllPostQuery("");


useEffect(() => {
/* (async()=>{
  const res = await getPostsData().unwrap();
  setPosts(res);
  console.log(res.post[0].desc)
})() */
}, [])

 return(
    <div id='feed'>
   
   <PostMaker/>

    {isLoading && <h1>Loading... </h1>}
      
      {/* {posts && posts?.post?.map((item,index)=>(
      <Post key={index} post={item} /> 
      ))} */}
   
      {!isLoading && data?.post.map((item,index)=>(
      <Post key={index} post={item} /> 
      ))}
      
    </div>
  )
}
