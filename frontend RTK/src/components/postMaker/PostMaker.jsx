import { useState } from 'react'
import './postMaker.css'
import { useSelector } from 'react-redux';
import { useCreatePostMutation } from '../../features/user/userApiSlice';
import {storage} from '../../firebase'; 
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

export default function PostMaker() {
  const [text,setText] = useState('');
  //const [imgUrl,setImgurl] = useState('');
  //const [videoUrl,setVideoUrl] = useState('');
  const [media, setMedia] = useState(null);
  const userInfo = useSelector((state)=>state.auth.userInfo);
  const [createPost,{isLoading}] = useCreatePostMutation();

  const [progress,setProgress] = useState(0);
  const [showProgress,setShowProgress] = useState(false);


  

   const identifyType = (value)=>{
    if(value.type.startsWith('image/')){
      return 'image';
    }else if(value.type.startsWith('video/')){
     return 'video';
    }else{
      return null;
    }
   }

const fireMedia = ()=>{
   if(media === null) return ;

    const mediaType = identifyType(media);
    console.log(mediaType);
    const meidaRef = ref(storage, `/post/${mediaType}/${media + v4()}`);
    const uploadTask = uploadBytesResumable(meidaRef,media);
     
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
          if(mediaType=='image'){
            // setImgurl(url);
             uploadToDB({type:'image',url});
          }else{
          // setVideoUrl(url);
           uploadToDB({type:'video',url});
          }
         
        });
      }
    )

  } 
 
  const uploadToDB =async(media)=>{
    const imgUrl = media?.type === 'image'? media?.url : '';
    const videoUrl = media?.type === 'video'? media?.url:'';
    const res = await createPost({
      desc:text,
      img: imgUrl || '',
      video: videoUrl || '',
    });
    setText('');
    console.log(res);
  }

  const postHandler = async(e)=>{
   e.preventDefault();

   if(!text && !media) alert("You can't post empty shit here!");
   if(media){
    fireMedia();
   }else if(!media && text){
    uploadToDB(null);
   }
   
   console.log(text);
   console.log(userInfo);
  }
  
  return (
    <div id='postMaker'>
       <form onSubmit={(e)=>postHandler(e)}>
        <input onChange={(e)=>setText(e.target.value)} type="text" placeholder="what's is your mind" value={text}/>
        <input 
         hidden
         type="file" id="media"
         accept='image/* , video/*'
         onChange={(e)=>setMedia(e.target.files[0])} 
        />
       
       <label htmlFor="media" id='mediaInput'>add media</label> {showProgress && `${progress}%`}
       
       <button type="submit">{isLoading ? "Loading..." : "Post"}</button>
       </form>
    </div>
  )
}
