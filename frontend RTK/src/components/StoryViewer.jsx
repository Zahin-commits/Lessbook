import React from 'react'

export const StoryViewer = ({story, user}) => {
  return (
    <div className='story_viewer'>
     <div className="user_info">
        <h4>{user.username}</h4>
        <img src={user.profilePic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="DP"/>
     </div>
     <div className='story_content'>
     {story.videoUrl && <video controls>
         <source src={story.videoUrl} type="video/mp4" />
        </video>}
         {story.imgUrl && <img src={story.imgUrl} alt="" />}
     </div>
    </div>
  )
}
