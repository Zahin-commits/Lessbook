import './profile.css'
import {useParams} from 'react-router-dom';
import { useGetAuthorDataQuery } from '../features/user/userApiSlice';
import { Feed } from './feed/Feed';

export const Profile = () => {
  let {id} = useParams();
  
  
  const {data,isLoading} = useGetAuthorDataQuery(id);
 console.log(data);
  return (
    <div id='profile'>
        {isLoading?<h1>Loading...</h1>: <div>
         <img className='profile_avatar' src={data?.user?.profilePic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="" />
         <h1> this is the profile of {data?.user?.username}</h1>
         <h2>following: {data?.user?.followings.length}</h2>
         <h2>followers: {data?.user?.followers.length}</h2>
        </div>}
        <button className='follow_btn'>follow</button>

        <Feed userId={id}/>
    </div>
  )
}
