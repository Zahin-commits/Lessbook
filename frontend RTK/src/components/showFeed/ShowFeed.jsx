import React from 'react'
import { useSelector } from 'react-redux'
import { Feed } from '../feed/Feed';

export const ShowFeed = () => {
    const {userInfo} = useSelector(state=>state.auth);
  return (
    <Feed userId={userInfo._id}/>
  )
}
