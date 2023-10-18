import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { useRegisterMutation } from '../features/user/userApiSlice';
import { setCredentials } from '../app/authSlice';
import { storage } from '../firebase';
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid';

export default function Register() {
  const [profilePic,setProfilePic] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  const [previewPic,setPreviewPic] = useState('');

  const [progress,setProgress] = useState(0);
  const [showProgress,setShowProgress] = useState(false);

  const inputRef = useRef('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector(state=>state.auth);
  const [register,{isLoading}] = useRegisterMutation();

useEffect(() => {
  if(userInfo){
    navigate('/');
   }
 },[navigate,userInfo])


 const handlePreview = ()=>{
   const img = inputRef.current.files[0];
   setProfilePic(img);
   setPreviewPic(URL.createObjectURL(img));
   console.log(img);
 }


 const fireMedia = ()=>{
  if(profilePic === null) return ;

   const meidaRef = ref(storage, `/profile/profile-picture/${profilePic + v4()}`);
   const uploadTask = uploadBytesResumable(meidaRef,profilePic);
    
   setShowProgress(true);

   uploadTask.on(
     'state_changed',
     (snapshot)=>{
       const uploaded = Math.floor(
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       );
       setProgress(uploaded);
     },
     (error) => {
       console.log(error);
     },
     () => {
       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
         console.log(url);
          setShowProgress(false);
          uploadToDB(url)
       });
     }
   )

 } 

 
 const uploadToDB =async(profileImg)=>{
  try {
    const res = await register({
      profilePic:profileImg,
      username,
      email,
      password}).unwrap();
   
    console.log(res);
    dispatch(setCredentials({...res})); 

    if(res.sucess){
      navigate('/');
    }
  } catch (error) {
    //console.log(error?.data?.message || error.error)
    console.log(error);
    if(error.data.includes('dup key')){
      alert('The username or email is already in use.');
    }else{
      alert('Something went wrong :(');
    }
  } 
}

const registerHandler = async(e)=>{
  e.preventDefault();
  fireMedia()
 /*  try {
    const res = await register({username,email,password}).unwrap();
   
    console.log(res);
    dispatch(setCredentials({...res})); 

    if(res.sucess){
      navigate('/');
    }
  } catch (error) {
    //console.log(error?.data?.message || error.error)
    console.log(error)
  } */
};

  return  <div id='register' className="container">
  <div className="section_1">

    <div className="choose_profilePic">
      <input 
       hidden
       ref={inputRef}
       type="file"
       accept='image/*'
       onChange={handlePreview}
       />

      <img src={previewPic || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'} alt="" />
      
      <button className='add_profile' onClick={()=>{inputRef.current.click()}}>+</button>
    </div>

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

  <button type="submit">{isLoading || showProgress? "Loading..." : "sign up"}</button>
</form>

<Link to={'/login'}>already have account</Link>
</div>
  </div>
</div>
}


/* const res = await register({
   username,
   email,
   password,
   profilePic,
 });
 console.log('register res',res);
 dispatch(setCredentials({...res})); */