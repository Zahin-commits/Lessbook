import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

export default function Register() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const dipatch = useDispatch;
  const state = useSelector((state)=> state.user)

  const registerHandler = async(e)=>{
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
  
    // const {data} = await axios.post('http://localhost:3000/auth/register',{username,email,password},config);
    
    // if(data.sucess && data.token){
    //   localStorage.setItem("authToken", data.token);
    //   navigate('/');
    // }


    console.log();
    console.log(data);
  }


  return  <div className="container">

{state.status == 'loading' && <h1>Loading...</h1>}
{state.status == 'successful' && <h1>done</h1>}



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

  <button type="submit">sign up</button>
</form>

<Link to={'/login'}>already have account</Link>
</div>
  </div>
</div>
}
