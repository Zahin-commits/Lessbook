import { useState } from 'react';
import {storage} from '../firebase'; 
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { useCreateStoryMutation } from '../features/user/userApiSlice';
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
    const imgUrl = media.type === 'image'? media.url : '';
    const videoUrl = media.type === 'video'? media.url:'';
    const res = await createStory({
      imgUrl: imgUrl || '',
      videoUrl: videoUrl || '',
    });
    console.log(res);
  }

  const storyHandler = async(e)=>{
    e.preventDefault();
    if(storyMedia === null) return ;

    const mediaType = identifyType(storyMedia);
    console.log(mediaType);
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
      { storyMedia && <div> 
      <button className='upload_story_btn' onClick={(e)=>storyHandler(e)}>create</button>
      <button className='cancel_story_btn' onClick={()=>setStoryMedia(null)}>cancel</button>
      </div>}
     <p>create story</p>
    </div>
  )
}
