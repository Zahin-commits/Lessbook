import React, { useState } from 'react'
import { useCreateCommentMutation } from '../../features/user/userApiSlice';

export const AddComment = ({postId}) => {
  const [text,setText] = useState('');
  //console.log('post id', postId);

  const [createComment,{isLoading}] = useCreateCommentMutation();

 
  const handleComment = ()=>{
  if(!text) return alert('you can not send an empty comment dude');

  createComment({postId,text}).unwrap().then(res=>{
    console.log(res);
    setText('');
  });
  }
  return (
    <div className='add_comment'>
      <input 
      type="text" 
      value={text}
      onChange={(e)=>setText(e.target.value)}
      placeholder='Write a comment' 
      className='comment_input' />
       <button className='comment_btn' onClick={handleComment} disabled={isLoading}>send</button>
    </div>
  )
}
