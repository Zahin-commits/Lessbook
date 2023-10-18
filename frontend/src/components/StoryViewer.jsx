import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Link} from 'react-router-dom';

export const StoryViewer = ({story, user,showStory,setShowStory}) => {
  return (
    <div className='story_viewer'>
      {showStory &&  <button className='hide_story' onClick={()=>setShowStory(!showStory)}><ArrowBackIosIcon/></button>}
   <Link to={`/profile/${user._id}`}> <div className="user_info">
        <h4>{user.username}</h4>
        <img src={user.profilePic || './unknown.jpg'} alt="DP"/>
     </div></Link>
     <div className='story_content'>
     {story.videoUrl && <video controls>
         <source src={story.videoUrl} type="video/mp4" />
        </video>}
         {story.imgUrl && <img src={story.imgUrl} alt="" />}
     </div>
    </div>
  )
}
