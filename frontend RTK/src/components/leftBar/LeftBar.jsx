import { useSelector } from 'react-redux'
import './LeftBar.css'
import { Link } from 'react-router-dom';

export const LeftBar = () => {
  const {userInfo} = useSelector(state=>state.auth);

  return (
    <div id='leftBar'>
      <Link to={`/profile/${userInfo._id}`}>
      <div className="profile">
      <img src={userInfo.profilePic} alt="" width={50}/>
      <p className="name">{userInfo.username}</p>
     </div>
      </Link>
     
     <Link to={`/profile/${userInfo._id}/followers`}>Followers</Link>
     <Link to={'/feed'}>posts</Link>
     <Link to={'/editprofile'}>settings</Link> 
    </div>
  )
}
