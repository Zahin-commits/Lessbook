import './topbar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { logout } from '../app/authSlice'

export const TopBar = () => {
    const [showDropdown,setShowDropdown] = useState(false);
    const {userInfo} = useSelector(state=>state.auth)

    const dispatch = useDispatch();

    const handleLogout=()=>{
        dispatch(logout());
    }
  return (
    <div id='topBar'>
        <div className='topBarRight'>
            <div className="logo">Lessbook</div>
            <div className="searchContaner"><input type="text" /></div>
        </div>
        <div className='topBarCenter'>
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>Followings</Link>
        </div>
        <div className='topBarLeft' onClick={()=>setShowDropdown(!showDropdown)}>
            
                <img className='userPic' src={userInfo.profilePic} alt="" />
            
            <p className='username'>{userInfo.username}</p>
           
           {showDropdown && <div className='dropdown'>
            <Link to={'/editProfile'}>edit profile</Link>
            <button onClick={handleLogout}>logout</button>
            </div>}
        </div>
    </div>
  )
}
