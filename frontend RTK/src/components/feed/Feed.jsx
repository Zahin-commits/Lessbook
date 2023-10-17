import './feed.css';
import { useGetAllPostByUserIdQuery, useGetAllPostQuery} from '../../features/user/userApiSlice'
import { Post } from '../post/Post';
import PostMaker from '../postMaker/PostMaker';


export const Feed = ({userId}) => {


//const [getPostsData,{isLoading}] = useGetPostsDataMutation();
 const {isLoading,data} = userId? useGetAllPostByUserIdQuery(userId) : useGetAllPostQuery("");

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
   

    {isLoading && <span className='loader_wraper'><span className='loader'></span></span>}
      
      {/* {posts && posts?.post?.map((item,index)=>(
      <Post key={index} post={item} /> 
      ))} */}
   
      {!isLoading && data?.post?.map((item,index)=>(
      <Post key={index} post={item}/> 
      ))}
      
    </div>
  )
}
