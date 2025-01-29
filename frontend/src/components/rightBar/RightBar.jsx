import { useGetUserDataQuery } from '../../features/user/userApiSlice'
import { Following } from '../following/Following';
import './rightBar.css'

export const RightBar = ({username}) => {
  const {data,isLoading} = useGetUserDataQuery(username);
 //  console.log('following data', data); 
  return (
    <div id='rightBar'>
        <h2>Followings</h2>
        {isLoading?<div className=''></div>:<div className='following-list'>
        {data?.user?.followings?.map((following,index)=>(
         <Following key={index} userId={following} currentUser={'rightBar'}/>
        ))}
    </div>}
    </div>
  )
}
