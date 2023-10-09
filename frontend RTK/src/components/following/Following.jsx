import { Link } from 'react-router-dom';
import { useFollowUserMutation, useGetAuthorDataQuery } from '../../features/user/userApiSlice'
import './following.css'

export const Following = ({userId}) => {
   const {data,isLoading} = useGetAuthorDataQuery(userId);
   const [followUser,{isLoading:followUserIsloading}] = useFollowUserMutation(); 
    //    console.log('following',data);

    const handleFollowUser=()=>{
        followUser(data?.user?._id);
    }
    return (
    <div className='following-wraper'>
        {isLoading?'loading...':
         <div className='following' >
             <Link to={`/profile/${data?.user?._id}`}>
              <img src={data?.user?.profilePic} alt="profile pic" width={50}/>
             </Link>
             <Link to={`/profile/${data?.user?._id}`}>
             <p className='name' >{data?.user?.username}</p>
             </Link>
           <button className='unfollow_btn' onClick={handleFollowUser}>{followUserIsloading?"loading":"unfollow"}</button>
         </div>
        }
       
    </div>
  )
}
