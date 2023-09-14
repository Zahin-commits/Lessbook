import { useState } from 'react'
import './postMaker.css'
import { useSelector } from 'react-redux';
import { useCreatePostMutation } from '../../features/user/userApiSlice';

export default function PostMaker() {
  const [text,setText] = useState('');
  const userInfo = useSelector((state)=>state.auth.userInfo);
  const [createPost,{isLoading}] = useCreatePostMutation();
  
  const postHandler = async(e)=>{
   e.preventDefault();
  
   if(!text) alert("You can't post empty shit here!")
   console.log(text);
   console.log(userInfo);
   const res = await createPost({
    desc:text,
    img:''
  });
  
  setText('');
   console.log(res);
  }
  
  return (
    <div id='postMaker'>
       <form onSubmit={(e)=>postHandler(e)}>

        <input onChange={(e)=>setText(e.target.value)} type="text" placeholder="what's is your mind" value={text}/>
       <button type="submit">{isLoading ? "Loading..." : "Post"}</button>
       </form>
    </div>
  )
}
