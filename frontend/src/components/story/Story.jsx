import React, { useEffect, useState } from 'react';
import { StoryViewer } from './StoryViewer';
import { useGetAuthorDataQuery } from '../../features/user/userApiSlice';

export const Story = ({story}) => {
// const [authorInfo,setAuthorInfo] = useState([]);
const [showStory,setShowStory] = useState(false); 

const {data,error,isLoading:isAuthorLoading} = useGetAuthorDataQuery(story.userId);
//  console.log(data);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // const res = await axios.get(`https://lessbook-api.onrender.com/user/${story.userId}`,{withCredentials: true});
  //     const res = await axios.get(`http://localhost:3000/user/${story.userId}`,{withCredentials: true});
  //     setAuthorInfo(res.data.user);
  //   //  console.log(res.data.user)
  //   };
  //   fetchUser();
  // }, [story.userId]);

  return (
    <>
    <div className='story' onClick={()=>setShowStory(!showStory)}>
      <div className="story_info">
        {/* <img className='user_pic' src={authorInfo.profilePic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="profile pic" />
        <p className='user_name'>{authorInfo.username || 'loading...'}</p> */}
        <img className='user_pic' src={data?.user?.profilePic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="profile pic" />
        <p className='user_name'>{!isAuthorLoading? data?.user?.username : 'loading...'}</p>
      </div>
      <div className="story_content">
        {story.videoUrl && <video controls>
         <source src={story.videoUrl} type="video/mp4" />
        </video>}
         {story.imgUrl && <img src={story.imgUrl} alt="" />}
      </div>

    </div>
{/*     {showStory &&  <button className='hide_story' onClick={()=>setShowStory(!showStory)}><ArrowBackIosIcon/></button>} */}
      {/* {showStory && <StoryViewer story={story} user={authorInfo} showStory={showStory} setShowStory={setShowStory}/>} */}
      {showStory && <StoryViewer story={story} user={data?.user} showStory={showStory} setShowStory={setShowStory}/>}
      </>
  )
}
