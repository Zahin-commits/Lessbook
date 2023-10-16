import './following.css';
import { Link } from 'react-router-dom';
import { useFollowUserMutation, useGetAuthorDataQuery } from '../../features/user/userApiSlice'
import { useSelector } from 'react-redux';

export const Following = ({userId,currentUser}) => {
   const {userInfo} = useSelector(state=>state.auth); 

   const {data,isLoading} = useGetAuthorDataQuery(userId);
   const [followUser,{isLoading:followUserIsloading}] = useFollowUserMutation(); 
    //    console.log('following',data);


    const handleFollowUser=()=>{
        followUser(data?.user?._id);
    }
    return (
    <div className='following-wraper'>
        {isLoading?<span className='loader'></span>:
        
         <div className='following' >
             <Link to={`/profile/${data?.user?._id}`}>
              <img src={data?.user?.profilePic} alt="profile pic" width={50}/>
             </Link>
             <Link to={`/profile/${data?.user?._id}`}>
             <p className='name' >{data?.user?.username}</p>
             </Link>
             {userInfo._id === userId?'':
             <button className='unfollow_btn' onClick={handleFollowUser}>
            {followUserIsloading?"loading":currentUser?.followings?.includes(userId) || currentUser==='rightBar'?"unfollow":"follow"}
            </button>
         }
         </div>
        }
       
    </div>
  )
}
