import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const StoryViewer = ({story, user,showStory,setShowStory}) => {
  return (
    <div className='story_viewer'>
      {showStory &&  <button className='hide_story' onClick={()=>setShowStory(!showStory)}><ArrowBackIosIcon/></button>}
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
