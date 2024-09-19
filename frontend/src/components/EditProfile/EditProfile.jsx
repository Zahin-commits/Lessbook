import './editProfile.css';
import { useGetAuthorDataQuery, useUpdateUserMutation } from '../../features/user/userApiSlice';
import {Feed} from '../feed/Feed' 
import {useDispatch, useSelector} from 'react-redux';
import { useRef, useState } from 'react';
import { storage } from '../../firebase';
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid';
import { setCredentials } from '../../app/authSlice';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const loaidngAvatar = './unknown.jpg';
const loadingCover = './coverPlaceholder.jpg';

export const EditProfile = () => {
  const {userInfo} = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const {data,isLoading} = useGetAuthorDataQuery(userInfo._id);

  const [updateUser,{isLoading:updateIsLoading}] = useUpdateUserMutation();
  
  const [profilePic,setProfilePic] = useState(null);
  const [coverPic,setCoverPic] = useState(null);
  
  const [previewProfilePic,setPreviewProfilePic] = useState('');
  const [previewCoverPic,setPreviewCoverPic] = useState('');

  const [progress,setProgress] = useState(0);
  const [showProgress,setShowProgress] = useState(false);

  const profilePicInputRef = useRef();
  const profileCoverInputRef = useRef();

  const handleProfilePicInput =()=>{
   profilePicInputRef.current.click();
  }

  const handleProfileCoverInput =()=>{
   profileCoverInputRef.current.click()
  }

  const chooseProfilePic=(e)=>{
   const img = e.target.files[0];
   setProfilePic(img);
  
   setPreviewProfilePic(URL.createObjectURL(img))
   console.log('profile img', img);

  }
  
  const chooseCoverPic =(e)=>{
   const img = e.target.files[0];
    
   setCoverPic(img);
   setPreviewCoverPic(URL.createObjectURL(img));
   console.log('cover pic',img);
  }
  
  let uploadProfileTask = null;
  let uploadCoverTask = null;
  
  const fireMedia = () => {
    setShowProgress(true);
  
    const uploadTasks = [];
  
    if (profilePic) {
      const profilePicRef = ref(storage, `/profile/profile-picture/${profilePic + v4()}`);
      uploadProfileTask = uploadBytesResumable(profilePicRef, profilePic);
      uploadTasks.push(uploadProfileTask);
  
      uploadProfileTask.on(
        'state_changed',
        (snapshot) => {
          const uploaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(uploaded);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    if (coverPic) {
      const coverPicRef = ref(storage, `/profile/cover-picture/${coverPic + v4()}`);
      uploadCoverTask = uploadBytesResumable(coverPicRef, coverPic);
      uploadTasks.push(uploadCoverTask);
  
      uploadCoverTask.on(
        'state_changed',
        (snapshot) => {
          // Track the progress for coverPic upload if needed.
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    // Use Promise.all to wait for all upload tasks to complete
    Promise.all(uploadTasks)
      .then(() => {
        setShowProgress(false);
        handleUploadComplete();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleUploadComplete = () => {
  
    if (profilePic && uploadProfileTask) {
      getDownloadURL(uploadProfileTask.snapshot.ref).then((profileUrl) => {
        updateUser({profilePic:profileUrl}).unwrap().then(res=>{
          dispatch(setCredentials({...res})); 
          profilePicInputRef.current.value = '';
        });
      });
    }
  
    if (coverPic && uploadCoverTask) {
      getDownloadURL(uploadCoverTask.snapshot.ref).then((coverUrl) => {
        updateUser({coverPicture:coverUrl}).unwrap().then(res=>{
          dispatch(setCredentials({...res})); 
          profileCoverInputRef.current.value = '';
        });
      });
    }
  
    // Pass downloadUrls to your uploadToDB function as needed
  };
  
  

  return (
    <div id='edit_profile'>
      <div className='section_1'>
        <img src={ previewCoverPic || data?.user?.coverPicture || loadingCover}
          onClick={handleProfileCoverInput}
         alt="cover pic" className='cover_pic'/>
         <div className='edit_btn edit_cover'>
          <EditRoundedIcon/>
          <p className='btn_text'>Change Cover</p>
         </div>
        
        <input type="file" ref={profileCoverInputRef} accept='image/*'
        onChange={(e)=>chooseCoverPic(e)} hidden
        />
      </div>

      <div className='section_2'>
       <img src={ previewProfilePic || data?.user?.profilePic || loaidngAvatar}
        alt="profile pic" className='profile_pic' onClick={handleProfilePicInput} />

        <div className='edit_btn .edit_profile'>
          <EditRoundedIcon/>
          <p className='btn_text'>Change Cover</p>
         </div>

       <input type="file" ref={profilePicInputRef} accept='image/*'
        onChange={(e)=>chooseProfilePic(e)} hidden
       />

      <p className='username'>{!isLoading ? data.user.username: 'Loading...'}</p>
      <p className='followers' >Followers:{ 0 || data?.user?.followers.length}</p>
      <p className='followings'>Flowwings:{0 || data?.user?.followings.length}</p>
      
      {(profilePicInputRef?.current?.files?.[0] || profileCoverInputRef?.current?.files?.[0]) && (
       <button className='update_profile--btn' onClick={fireMedia}>{showProgress || updateIsLoading?'Loading...':'Update'}</button>
     )}

      </div>
      {/* <Feed userId={userInfo._id}/> */}
    
    </div>
  )
}
