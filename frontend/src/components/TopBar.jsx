import './topbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout } from '../app/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeSwitch from './ThemeSwitch';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useHamburger from '../useHamburger';
import { SearchUsers } from './SearchUsers/SearchUsers';

export const TopBar = () => {
    const [showDropdown,setShowDropdown] = useState(false);
    const [showSearch,setShowSearch] = useState(false);
    const {userInfo} = useSelector(state=>state.auth)

    const {toggleActive} = useHamburger('#leftBar');

    const dispatch = useDispatch();

    const handleLogout=()=>{
     const isSure = confirm("Are you sure you want to logout?");
     if (isSure) {
      dispatch(logout());
     }; 
    }
  return (
    <div id='topBar'>
        <div className='topBarRight vertical_align'>
            <div id='nav_btn' onClick={toggleActive} ><MenuIcon/></div>
            <div className="logo">
              <img src="./logo.png" width={50} alt="" />
            </div>
            <div className="searchContaner vertical_align" >
              <SearchRoundedIcon onClick={()=>setShowSearch(!showSearch)}/> 
              <input className='psudoInput' type="text" placeholder='Sarch Lessboook' onClick={()=>setShowSearch(!showSearch)} />
              { showSearch && <div className="searchDropDown">
                 <SearchUsers setShowSearch={setShowSearch} showSearch={showSearch} />
               </div>}
              </div>
        </div>
        <div className='topBarCenter'>
            <Link to={'/'}><HomeRoundedIcon/></Link>
            <Link to={`/profile/${userInfo._id}/followers`}><GroupRoundedIcon/></Link>
        </div>
        <div className='topBarLeft'>
        <ThemeSwitch/>
         <div className='profile_info' onClick={()=>setShowDropdown(!showDropdown)}>
          <img className='userPic' src={userInfo.profilePic} alt="" />
          <p className='username'>{userInfo.username}</p>
         </div>
            
           
           {showDropdown && <div className='dropdown'>
            <Link className='vertical_align' to={'/editProfile'}>edit profile <EditRoundedIcon/></Link>
            <button className='vertical_align' onClick={handleLogout}>logout <LogoutRoundedIcon/></button>
            {/* <button onClick={toggleTheme}>{isThemeDark?'light mode':'dark mode'}</button> */}
            </div>}
        </div>
    </div>
  )
}
