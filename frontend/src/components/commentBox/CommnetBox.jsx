import React from 'react'
import { useGetCommnetsQuery } from '../../features/user/userApiSlice';
import {Comment} from './Comment'
import { AddComment } from './AddComment';

export const CommnetBox = ({postId}) => {

   // console.log(postId);
 const {data,isLoading} = useGetCommnetsQuery(postId);

 //console.log(data);
 
  return ( <div className='commentBox'>
     {/* <Comment data={{text:'asdf'}}/>
      <Comment data={{text:'asdf'}}/> */}

    {isLoading ? 'Loading...': <div> 
     <AddComment postId={postId}/>
     
         {data?.comment?.map(item=>(
            <Comment commentData={item}/>
         ))}
        </div>
    }
   </div>
  )
}
