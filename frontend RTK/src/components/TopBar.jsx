import './topbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout } from '../app/authSlice';
import useDarkTheme from '../useDarkTheme';
import MenuIcon from '@mui/icons-material/Menu';

export const TopBar = () => {
    const [showDropdown,setShowDropdown] = useState(false);
    const {userInfo} = useSelector(state=>state.auth)

    const dispatch = useDispatch();
    const {isThemeDark, toggleTheme} = useDarkTheme();

    const handleLogout=()=>{
        dispatch(logout());
    }
  return (
    <div id='topBar'>
        <div className='topBarRight'>
            <div id='nav_btn'><MenuIcon/></div>
            <div className="logo">L</div>
            <div className="searchContaner"><input type="text" /></div>
        </div>
        <div className='topBarCenter'>
            <Link to={'/'}>Home</Link>
            <Link to={`/profile/${userInfo._id}/followers`}>Followers</Link>
        </div>
        <div className='topBarLeft' onClick={()=>setShowDropdown(!showDropdown)}>
            
                <img className='userPic' src={userInfo.profilePic} alt="" />
            
            <p className='username'>{userInfo.username}</p>
           
           {showDropdown && <div className='dropdown'>
            <Link to={'/editProfile'}>edit profile</Link>
            <button onClick={handleLogout}>logout</button>
            <button onClick={toggleTheme}>{isThemeDark?'light mode':'dark mode'}</button>
            </div>}
        </div>
    </div>
  )
}
