import { useGetUserDataQuery } from '../../features/user/userApiSlice'
import { Following } from '../following/Following';
import './rightBar.css'

export const RightBar = ({username}) => {
  const {data,isLoading} = useGetUserDataQuery(username);
 //  console.log('following data', data); 
  return (
    <div id='rightBar'>
        <h2>followings</h2>
        {isLoading?'loading...':<div className='following-list'>
        {data?.user?.followings?.map(following=>(
         <Following userId={following} currentUser={data?.user?._id}/>
        ))}
    </div>}
    
    </div>
  )
}
