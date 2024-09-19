const Comment = require("../model/Comment");
const Post = require("../model/Post");

exports.sendComment = async(req,res)=>{
 const postId = req.params.postId;
 const text = req.body.text;
 const userId = req.user._id;

 if(!postId){
  return res.status(401).json({sucess:false,message:"post id required"});
 }

 if(!text){
    return res.status(401).json({sucess:false,message:"your comment can't be empty"});
 }

 try {
  const post = await Post.findById(postId); 
  if(!post){
    return res.status(404).json({sucess:false,message:"no post found with this id"});
 }
  const comment = await Comment.create({postId,userId,text});

  res.json({sucess:true,comment});
 } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
 }

};


exports.findAllComment = async(req,res)=>{
 const postId = req.params.postId;

 if(!postId){
   return res.status(401).json({sucess:false,message:"post id required"});
 }

 try {
   const comment = await Comment.find({postId});
   res.json({sucess:true, comment})
 } catch (error) {
   res.status(500).json({sucess:false, message:error.message});
 }
}

exports.getOneComment = async(req,res)=>{
 const id = req.params.id;
 if(!id){
 return res.status(401).json({sucess:false,message:"comment id required"});
 }

 try {
   const comment = await Comment.findById(id);
  if(!comment){
  return res.status(404).json({sucess:false,message:"comment id required"});
  }

   res.json({sucess:true, comment});
 } catch (error) {
   res.status(500).json({sucess:false, message:error.message});
 }
}


exports.deleteComment = async (req,res)=>{
  const commentId = req.params.id;
 
  const comment = await Comment.findById(commentId);

  if(!commentId){
    return res.status(404).json({sucess:false, message:"comment not found"});
  }
  

  if(req.user._id == comment.userId){
    // console.log(req.user._id);
    // console.log(comment.userId);
   try {
    await comment.deleteOne();
    res.json({sucess:true,message:"your comment has been deleted"});
   } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
   }
  }else{
   res.status(403).json({sucess:false, message:"you can delete only your comments"});
  }
}
