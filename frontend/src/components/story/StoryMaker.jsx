import { useState } from 'react';
import {storage} from '../../firebase'; 
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { useCreateStoryMutation } from '../../features/user/userApiSlice';
import {v4} from 'uuid';

export const StoryMaker = () => {
  const [storyMedia,setStoryMedia] = useState(null);

  const [progress,setProgress] = useState(0);
  const [showProgress,setShowProgress] = useState(false);

  const [createStory,{isLoading}] = useCreateStoryMutation();

  const identifyType = (value)=>{
    if(value.type.startsWith('image/')){
      return 'image';
    }else if(value.type.startsWith('video/')){
     return 'video';
    }else{
      return null;
    }
   };

   const uploadToDB =async(media)=>{
    try {
     const imgUrl = media.type === 'image'? media.url : '';
    const videoUrl = media.type === 'video'? media.url:'';
    const res = await createStory({
      imgUrl: imgUrl || '',
      videoUrl: videoUrl || '',
     
    });  
  console.log(res);
    } catch (error) {
     alert('Something went wrong') 
    }
  }

  const storyHandler = async(e)=>{
    e.preventDefault();
    if(storyMedia === null) return alert("You can't make empty stories!");

    const mediaType = identifyType(storyMedia);
   // console.log(mediaType);
    const meidaRef = ref(storage, `/story/${mediaType}/${storyMedia + v4()}`);
    const uploadTask = uploadBytesResumable(meidaRef,storyMedia);
     
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
        alert('Something went wrong, please try again.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
       //   console.log(url);
           setShowProgress(false);
           setStoryMedia(null);
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

  return (
    <div id='story_maker'>
      <input 
      hidden
      type="file"
      id='story_input'
      accept='image/* , video/*'
      onChange={(e)=>setStoryMedia(e.target.files[0])} 
      />
      <label htmlFor="story_input" className="add_story_btn">+</label>
      { storyMedia && <div className='story_upload'> 
       {showProgress && <span>{progress}%</span>} 
      <button className='upload_story_btn' onClick={(e)=>storyHandler(e)} disabled={isLoading || showProgress} >
       {(showProgress||isLoading)?"Uploading":"Create"} </button>
     { (!showProgress && !isLoading) && <button className='cancel_story_btn' onClick={()=>setStoryMedia(null)}>Cancel</button>}
      </div>}
    {(!isLoading && !showProgress) && <p>Create Story</p>} 
    </div>
  )
}
