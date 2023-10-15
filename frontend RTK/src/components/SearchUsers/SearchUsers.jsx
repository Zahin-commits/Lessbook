import './searchUser.css';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useSearchUsersMutation } from '../../features/user/userApiSlice';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export const SearchUsers = ({setShowSearch,showSearch}) => {
    const [SearchUsers,{isLoading}] = useSearchUsersMutation();
    const [input,setInput] = useState('');
    const [users,setUsers] = useState([]);

    const handleSearch = async()=>{
     const data = await SearchUsers(input).unwrap();
     console.log('search result', data);
     setUsers(data?.users);
     setInput('');
    }
  return (
    <div id='Search_container'>
     <div className="search_bar vertical_align">
        <button className='back_btn' onClick={()=>setShowSearch(!showSearch)}><ArrowBackRoundedIcon/></button>
        <div className=' input_container vertical_align'>
          <SearchRoundedIcon/>
          <input type="text" placeholder='Search lessbook' onChange={(e)=>setInput(e.target.value)} value={input} />
        </div>
        <button className='search_btn' onClick={handleSearch}>Search</button>
     </div>
     <div className='search_result'>
      {isLoading && <p>Loading...</p>} 
       {!isLoading && users?.map(user=>(
        <Link to={`/profile/${user?._id}`}>
         <div className='user' key={user?._id}>
            
          <img src={user?.profilePic || './unknown.jpg'} alt="db" width={45}/>
          <div className='user_info'>
            <p>{user?.username}</p>
            <span>followers:{user?.followers?.length}</span>
          </div>
         </div>
          </Link>
       ))}
     </div>
    </div>
  )
}
