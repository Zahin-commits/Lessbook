import './post.css';
import { useGetAuthorDataQuery, useLikePostMutation } from '../../features/user/userApiSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CommnetBox } from '../commentBox/CommnetBox';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export const Post = ({post}) => {
  //const {username} = useParams()
  // console.log('post', post)
  const {userInfo} = useSelector(state=>state.auth);

  const [aothorInfo,setAuthorInfo] = useState('');
  const [likeCount,setLikeCount] = useState(post.likes.length);
  const [showComments,setShowComments] = useState(false); 

  const [likePost,{isLoading}] = useLikePostMutation();

  const likeHandler = ()=>{
   likePost(post._id).unwrap().then((data)=>{
    if(data.sucess){
      let newLikeCount;
      if(data.liked){
        newLikeCount = likeCount + 1;
      }else{
        newLikeCount = likeCount - 1;
      }
        setLikeCount(newLikeCount);
        console.log(data);
    }
    console.log('like data ',data);
  })
};

  
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // const res = await axios.get(`https://lessbook-api.onrender.com/user/${post.userId}`,{withCredentials: true});
  //     const res = await axios.get(`http://localhost:3000/user/${post.userId}`,{withCredentials: true});
      
  //     setAuthorInfo(res.data.user);
      

  //   };
  //   fetchUser();
  // }, [post.userId]);

  const {data,error,isLoading:isAuthorLoading} = useGetAuthorDataQuery(post.userId);
  
 
  return (
    <div className='post'>
    <div className="post-info">

      {/* <Link to={`/profile/${post.userId}`}> <img src={aothorInfo.profilePic || './unknown.jpg'} alt="" className="prfile-pic" /></Link> */}
      <Link to={`/profile/${post.userId}`}> <img src={data?.user?.profilePic || './unknown.jpg'} alt="" className="prfile-pic" /></Link>
       
       <div className='author'>
        {/* <Link  to={`/profile/${post.userId}`}><p className='author-name'>{aothorInfo?.username || 'Loading'} </p></Link>  */}
        <Link  to={`/profile/${post.userId}`}><p className='author-name'>{data?.user?.username || ' '} </p></Link> 
     
       <span className="createAt">{new Date(post.createdAt).toLocaleDateString()}</span> 
        </div> 
    </div>
 
  <div className="post_content">
  <p className='post-text'>
  {post.desc}
 </p>
  {post.video &&<video controls id='post_video'>
     <source src={post.video} type="video/mp4"/>
    </video>}

   {post.img && <img src={post.img} alt="" /> }  
       
  </div>
  <div className="post_engagement">
    <button className="like" onClick={likeHandler} disabled={isLoading}>
     {post?.likes?.includes(userInfo._id)? <ThumbUpAltIcon style={{color:'#2580FF'}} /> : <ThumbUpAltIcon/>}
      </button> {isLoading? ' ':post?.likes?.length}
    <div className="comment-container" onClick={()=>setShowComments(!showComments)}><ChatBubbleIcon/></div> 
  </div>
   {showComments && <CommnetBox postId={post._id}/>}  
    </div>
  )
}
