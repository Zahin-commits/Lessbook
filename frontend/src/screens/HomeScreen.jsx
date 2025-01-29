import React from 'react'
import { Feed } from '../components/feed/Feed'
import { StoryContainer } from '../components/story/StoryContainer'
import { RightBar } from '../components/rightBar/RightBar'
import { LeftBar } from '../components/leftBar/LeftBar'
import { useSelector } from 'react-redux'
import { TopBar } from '../components/topBar/TopBar'

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
