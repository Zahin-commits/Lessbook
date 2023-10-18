import './commentBox.css'
import React, { useState } from 'react'
import { useCreateCommentMutation, useGetAuthorDataQuery } from '../../features/user/userApiSlice'

const loaidngAvatar = 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png';

export const Comment = ({commentData}) => {

  const {data,isLoading} = useGetAuthorDataQuery(commentData.userId);
 
  return (
    <div className='comment'>
      <div className='comment_author'>
         <img src={data?.user?.profilePic || loaidngAvatar} alt="dp" className='comment_author--pic' />
      <span className='comment_author--name'>{data?.user?.username || 'loading'}</span>
      <span className="created_at">{new Date(commentData?.createdAt).toLocaleDateString()}</span>
      </div>
     
      <p className='comment_text'>
      {commentData?.text}
      </p>
      </div>
  )
}
