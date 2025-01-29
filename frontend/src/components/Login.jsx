import { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { setCredentials } from '../app/authSlice';
import { useLoginMutation } from '../features/user/userApiSlice';
import LoadingSvg from './LoadingSvg';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector(state=>state.auth);
  const [login, {isLoading}] = useLoginMutation();


  useEffect(()=>{
    if(userInfo){
     navigate('/');
    }
  },[navigate,userInfo])


  const loginHandler = async(e)=>{
    e.preventDefault();

    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      console.log(res);
      if(res.sucess){
        navigate('/');
      }else if(res.sucess ==false){
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.data.error);
    }
  }

  return <div id='login' className="container">
    <div className="section_1">
        <div className="text_box">
        <h1>Lessbook</h1>
    <p>Lessbook helps you disconnect and fight <br/>
       with the people in your life.</p>   
        </div>
    </div>

    <div className="section_2">
    <div className="content">
        <form onSubmit={(e)=>loginHandler(e)}>
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>

      <button type="submit">{isLoading ? <div className='loader_wraper'><LoadingSvg color='#ffff'/></div> : "Log in"}</button>
        </form>
        <Link to={'/register'}>don't have an account?</Link>
    </div>
    </div>
  </div>
}
