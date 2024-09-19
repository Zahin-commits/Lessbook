import './leftBar.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';

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
     
     <Link to={`/profile/${userInfo._id}/followers`} className='vertical_align' ><SupervisorAccountIcon/> <span>Followers</span> </Link>
     <Link to={'/feed'} className='vertical_align'> <EmailIcon/> <span>Posts</span> </Link>
     <Link to={'/editprofile'} className='vertical_align'> <SettingsIcon/> <span>Settings</span> </Link> 
    </div>
  )
}
