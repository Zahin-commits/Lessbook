import './feed.css';
import { useGetAllPostByUserIdQuery, useGetAllPostQuery} from '../../features/user/userApiSlice'
import { Post } from '../post/Post';
import PostMaker from '../postMaker/PostMaker';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../app/authSlice';
import { useDispatch } from 'react-redux';
import LoadingSvg from '../LoadingSvg';

export const Feed = ({userId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

//const [getPostsData,{isLoading}] = useGetPostsDataMutation();
 const {isLoading,data,error} = userId? useGetAllPostByUserIdQuery(userId) : useGetAllPostQuery("");

if(error){
  console.log('error',error);
  console.log('status',error.status);
  if(error.status === 401){

    console.log('unauthorized');
    dispatch(logout());
    navigate('/');
  }else{
   alert('Something went wrong.');
  }
}


 //console.log(data)
/*useEffect(() => {
 (async()=>{
  const res = await getPostsData().unwrap();
  setPosts(res);
  console.log(res.post[0].desc)
})()
}, []) */

 return(
    <div id='feed'>
   {!userId &&<PostMaker/>}
   

    {isLoading && <span className='loader_wraper'>
      {/* <span className='loader'></span> */}
       <LoadingSvg/> </span>}
      
      {/* {posts && posts?.post?.map((item,index)=>(
      <Post key={index} post={item} /> 
      ))} */}
   
      {!isLoading && data?.post?.map((item,index)=>(
      <Post key={index} post={item}/> 
      ))}
      
    </div>
  )
}
