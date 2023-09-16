import axios from 'axios';
import './post.css';
import { useGetAuthorDataQuery, useGetAuthorInfoMutation } from '../../features/user/userApiSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Post = ({post}) => {
  //const {username} = useParams()
  const [aothorInfo,setAuthorInfo] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:3000/user/${post.userId}`,{withCredentials: true});
      setAuthorInfo(res.data.user);
    //  console.log(res.data.user)
    };
    fetchUser();
  }, [post.userId]);
 /*  const [getAuthorInfo,{isLoading}] = useGetAuthorInfoMutation();
 
  if(post.userId){
     const userId = post.userId;
    
      const res = getAuthorInfo(userId).unwrap().then((data,error)=>{
        if(data){
         setAuthorInfo(data); 
        }
      }); 
     
 
   
  //const {data,isLoading} = useGetAuthorDataQuery(userId);

  
  }*/
  return (
    <div className='post'>
    <div className="post-info">

      <Link to={`profile/${post.userId}`}> <img src={aothorInfo.profilePic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="" className="prfile-pic" /></Link>
       
       <div className='author'>
        <Link  to={`profile/${post.userId}`}><p className='author-name'>{aothorInfo?.username} </p></Link> 
     
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
    <div className="like">likes:{post.likes.length}</div> 
    <div className="comment">comment: null</div>
  </div>
    </div>
  )
}
