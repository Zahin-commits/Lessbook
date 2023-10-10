import './showFollowings.css';
import { Following } from '../following/Following';
import {useParams} from 'react-router-dom';
import { useGetAuthorDataQuery, useGetUserDataQuery } from '../../features/user/userApiSlice';
import { useSelector } from 'react-redux';

export const ShowFollowings = () => {
  const {id} = useParams();
  const {userInfo} = useSelector(state=>state.auth);
  const {data,isLoading} = useGetAuthorDataQuery(id);
  const {data:currentUser,isUserLoading} = useGetUserDataQuery(userInfo.username);
 return (
  <div>

    {isLoading?'loading...':<div id='showFollowings'>
    {data?.user?.followings?.length === 0 && <p>This user has no followers yet</p>}
        {data?.user?.followings?.map(following=>(
         <Following userId={following} currentUser={currentUser?.user}/>
        ))}
     </div>}  
  </div>
  )
}
