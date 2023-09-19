import React from 'react'
import { TopBar } from '../components/TopBar'
import { Feed } from '../components/feed/Feed'
import { StoryContainer } from '../components/StoryContainer'

export const HomeScreen = () => {
  return (
    <>
    <TopBar/>
    <StoryContainer/>
    <Feed/>
    </>
  )
}
