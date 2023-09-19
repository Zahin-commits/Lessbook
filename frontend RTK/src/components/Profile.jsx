import './profile.css'
import {useParams} from 'react-router-dom';
import { useFollowUserMutation, useGetAuthorDataQuery } from '../features/user/userApiSlice';
import { Feed } from './feed/Feed';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
  let {id} = useParams();
  //const dispatch = useDispatch(); im not sure that if i should 
  //update the following list of the localay stored user data or not 

  const {userInfo} = useSelector(state=>state.auth);
  console.log(userInfo)
 const {data,isLoading} = useGetAuthorDataQuery(id);
 console.log(data);
 
 const [followUser,{isLoading:followUserIsloading}] = useFollowUserMutation();
 const handleFollowUser = ()=>{
  followUser(id);
 }
 return (
    <div id='profile'>
        {isLoading?<h1>Loading...</h1>: <div>
         <img className='profile_avatar' src={data?.user?.profilePic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="" />
         <h1> this is the profile of {data?.user?.username}</h1>
         <h2>following: {data?.user?.followings.length}</h2>
         <h2>followers: {data?.user?.followers.length}</h2>
        </div>}
        <button onClick={handleFollowUser} className='follow_btn'>
          {/* {isLoading || followUserIsloading && 'loading...'}
          {data?.user?.followers.includes(userInfo._id)? 'Unfollow':'follow'} */}
          {isLoading || followUserIsloading ? 'loading...' :
          data?.user?.followers.includes(userInfo._id)? 'Unfollow':'follow'}
         
          </button>

        <Feed userId={id}/>
    </div>
  )
}
