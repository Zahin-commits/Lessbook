import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { useRegisterMutation } from '../features/user/userApiSlice';
import { setCredentials } from '../app/authSlice';

export default function Register() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector(state=>state.auth);
  const [register,{isLoading}] = useRegisterMutation();

useEffect(() => {
  if(userInfo){
    navigate('/');
   }
 },[navigate,userInfo])


  const registerHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await register({username,email,password}).unwrap();
     
      console.log(res);
      dispatch(setCredentials({...res})); 

      if(res.sucess){
        navigate('/');
      }
    } catch (error) {
      //console.log(error?.data?.message || error.error)
      console.log(error)
    }
 };


  return  <div className="container">
  <div className="section_1">
    <div className="text_box">
   <h1>Lessbook</h1>
    <p>Lessbook helps you disconnect and fight <br/>
       with the people in your life.</p>      
    </div>
   
  </div>
  <div className="section_2">
    <div className="content">
<form onSubmit={(e)=>registerHandler(e)}>
  <input type="text" placeholder="Name" onChange={(e)=>setUsername(e.target.value)}/>
  <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
  <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>

  <button type="submit">{isLoading? "Loading..." : "sign up"}</button>
</form>

<Link to={'/login'}>already have account</Link>
</div>
  </div>
</div>
}
