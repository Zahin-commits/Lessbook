import './profile.css'
import {useParams} from 'react-router-dom';
import { useFollowUserMutation, useGetAuthorDataQuery } from '../features/user/userApiSlice';
import { Feed } from './feed/Feed';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const Profile = () => {
  let {id} = useParams();
  //const dispatch = useDispatch(); im not sure that if i should 
  //update the following list of the localay stored user data or not 
  const {userInfo} = useSelector(state=>state.auth);
  console.log(userInfo)
  const {data,isLoading} = useGetAuthorDataQuery(id);
 //console.log(data);
  
 const [followerCount,setFollowCount] = useState(null);
 const [isFollowing,setIsfollowing] = useState(false); 

  console.log('followers from data',data?.user?.followings.length);

 const [followUser,{isLoading:followUserIsloading}] = useFollowUserMutation();

// setFollowCount(data?.user?.followings.length);
 
const followerHandler = ()=>{
  const res = followUser(id).unwrap().then((res)=>{
    console.log('follow user data: ',res);
    if(res.sucess){
      if(res.isFollowing){
       let newFollowerCount = data?.user?.followers.length + 1;
       setFollowCount(newFollowerCount);
      }else{
       let newFollowerCount = data?.user?.followers.length - 1;
       setFollowCount(newFollowerCount);
      }
      console.log('follower count',followerCount);
      setIsfollowing(res.isFollowing);
    }
  })
};

 return (
    <div id='profile'>
        {isLoading?<h1>Loading...</h1>: <div className='profile_theme' >
         <div className="cover_pic" style={{backgroundImage: `url(${data?.user?.coverPicture})`}}></div>
           <div className='profile_info'>
            <img className='profile_avatar' src={data?.user?.profilePic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="" />
            <h2 className='username'>{data?.user?.username}</h2>
            <div className='follow_info'>
             <p>following: {data?.user?.followings.length}</p>
             <p>followers: {isLoading? "loading...": followerCount || data?.user?.followers.length}</p>
            </div>
          </div>
        <button onClick={followerHandler} className='follow_btn'>
          {isLoading || followUserIsloading ? 'loading...' :
          data?.user?.followers.includes(userInfo._id) || isFollowing? 'Unfollow':'follow'} 
        </button>
        </div>}

        
         <div className='user_posts'>
        <Feed userId={id}/>
         </div>
    </div>
  )
}
