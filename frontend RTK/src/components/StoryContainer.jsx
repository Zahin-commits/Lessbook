import './storyContainer.css';
import { Story } from './Story';
import { StoryMaker } from './StoryMaker';
import { useGetAllStoryQuery } from '../features/user/userApiSlice';
import useScroll from '../useScroll';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
 
export const StoryContainer = () => {
const {scrollLeft,scrollRight} = useScroll('#story_container');
const {data,isLoading} = useGetAllStoryQuery();

 console.log('stories', data);

  return (
    <div id="story_container_wraper">
    <div id='story_container'>
      
      <StoryMaker/>

      {!isLoading && data?.stories?.[0] ? data?.stories?.map((story)=>(
        
         <Story story={story}/> 
      )): 'no story avalable'}

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
    <button className='scroll_btn right_btn' onClick={scrollRight}><ArrowForwardIosRoundedIcon/></button>
    <button className='scroll_btn left_btn' onClick={scrollLeft} ><ArrowBackIosNewRoundedIcon/></button>
    </div>
  )
}
