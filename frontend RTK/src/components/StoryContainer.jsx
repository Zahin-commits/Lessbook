import './storyContainer.css';
import { Story } from './Story';
import { StoryMaker } from './StoryMaker';
import { useGetAllStoryQuery } from '../features/user/userApiSlice';
import useScroll from '../useScroll';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
 
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
      )):  <div className='empty_story' > <SentimentDissatisfiedIcon/> <p>No Story Avalable</p></div>}
     
    </div>
    <button className='scroll_btn right_btn' onClick={scrollRight}><ArrowForwardIosRoundedIcon/></button>
    <button className='scroll_btn left_btn' onClick={scrollLeft} ><ArrowBackIosNewRoundedIcon/></button>
    </div>
  )
}
