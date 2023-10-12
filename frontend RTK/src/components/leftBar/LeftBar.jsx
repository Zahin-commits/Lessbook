import './LeftBar.css';
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
     
     <Link to={`/profile/${userInfo._id}/followers`}><SupervisorAccountIcon/> Followers</Link>
     <Link to={'/feed'}> <EmailIcon/> posts</Link>
     <Link to={'/editprofile'}> <SettingsIcon/> settings</Link> 
    </div>
  )
}
