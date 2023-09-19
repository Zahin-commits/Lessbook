import './storyContainer.css';
import { Story } from './Story';
import { StoryMaker } from './StoryMaker';
import { useGetAllStoryQuery } from '../features/user/userApiSlice';
const profilePic = 'https://starsunfolded.com/wp-content/uploads/2023/06/Puneet-Superstar-image.jpg';

 
export const StoryContainer = () => {
const {data,isLoading} = useGetAllStoryQuery();

 console.log('stories', data);

  return (
    <div id='story_container'>
      
      <StoryMaker/>

      {!isLoading && data?.stories?.map((story)=>(
        <Story story={story}/>
      ))}

{/*         <div className='story'>
      <div className="story_info">
        <img className='user_pic' src={profilePic} alt="profile pic" />
        <p className='user_name'>puneet superstar</p>
      </div>
      <div className="story_content">
        <video controls>
         <source src='https://firebasestorage.googleapis.com/v0/b/lessbook-ffccf.appspot.com/o/post%2Fvideo%2F%5Bobject%20File%5D0c2b0e3b-646c-4466-afa7-05b99068aafb?alt=media&token=31b6f4dd-5cfb-42fe-8875-ab30082094a1' type="video/mp4" />
        </video>
         {/* <img src={img1} alt="" /> 
      </div>
    </div>

        <div className='story'>
      <div className="story_info">
        <img className='user_pic' src={profilePic} alt="profile pic" />
        <p className='user_name'>puneet superstar</p>
      </div>
      <div className="story_content">
        <video controls>
         <source src='https://firebasestorage.googleapis.com/v0/b/lessbook-ffccf.appspot.com/o/post%2Fvideo%2F%5Bobject%20File%5D6d23ae02-7896-4079-995e-d6d131abd79e?alt=media&token=774ebdf6-486f-44f7-acd2-8bc6f0615f4a' type="video/mp4" />
        </video>
         {/* <img src={img1} alt="" /> 
      </div>
    </div> */}
    </div>
  )
}
