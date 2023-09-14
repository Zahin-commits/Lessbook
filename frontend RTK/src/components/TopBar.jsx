import './topbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const TopBar = () => {

    const {userInfo} = useSelector(state=>state.auth)
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
        <div className='topBarLeft'>
            <Link to={'/'}>
                <img className='userPic' src={userInfo.profilePic} alt="" />
            </Link>
            <Link to={'/'}>
            <p className='username'>{userInfo.username}</p>
            </Link>
        </div>
    </div>
  )
}
