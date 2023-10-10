import './showFollowers.css';
import { useGetAuthorDataQuery, useGetUserDataQuery } from '../../features/user/userApiSlice';
import { Following } from '../following/Following';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ShowFolloers = () => {
  const {id} = useParams();
  const {userInfo} = useSelector(state=>state.auth);
  const {data,isLoading} = useGetAuthorDataQuery(id);
  // const {data:currentUser,isUserLoading} = useGetAuthorDataQuery(userInfo._id);
  const {data:currentUser,isUserLoading} = useGetUserDataQuery(userInfo.username);
 return (
  <div>
    {isLoading?'loading...':<div id='showFollowres'>
    {data?.user?.followers?.length === 0 && <p>This user dose not follow anyone yet</p>}
        {data?.user?.followers?.map(follower=>(
         <Following userId={follower} currentUser={currentUser?.user}/>
        ))}
     </div>}
    
  </div>
  )
}
