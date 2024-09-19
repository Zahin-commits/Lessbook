import React from 'react'
import { TopBar } from '../components/TopBar'
import { Feed } from '../components/feed/Feed'
import { StoryContainer } from '../components/StoryContainer'
import { RightBar } from '../components/rightBar/RightBar'
import { LeftBar } from '../components/leftBar/LeftBar'
import { useSelector } from 'react-redux'

export const HomeScreen = () => {
  const {userInfo} = useSelector(state=>state.auth);
  return (
    <>
    <TopBar/>
    <LeftBar/>
    <StoryContainer/>
    <Feed/>
    <RightBar username={userInfo.username}/>
    </>
  )
}
