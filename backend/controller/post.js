const Comment = require("../model/Comment");
const Post = require("../model/Post");


exports.createPost = async(req,res)=>{
 const {desc,img,video} = req.body; 
 const user = req.user;
 if(!user){
  return res.status(404).json({sucess:false, message:"user id not found"});
 } 

 if(!desc && !img && !video){
  return res.status(401).json({sucess:false, message:"your post can not be empty"});
 }

 try {
  const post = await Post.create({
   userId:user._id,
   desc,
   img,
   video
  });

  res.status(201).json({sucess:true, post});
 } catch (error) {
 res.status(500).json({sucess:false, message:error.message});
 }
};

exports.getAllPost = async(req,res)=>{
   const {userId} = req.query; 
  try {
    let post;
    if(userId){
      post = await Post.find({userId}).sort('-createdAt');
    }else{
     post = await Post.find().sort('-createdAt');
 }  
    res.json({sucess:true, post});
  } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
  }
}

exports.findOnePost = async(req,res)=>{
 const id = req.params.id;
 if(!id){
  return res.status(401).json({sucess:false, message:"can not find post without postId"});
 }

 try {
    const post = await Post.findById(id);
 
    res.json({sucess:true, post});
 } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
 }
};

exports.updatePost = async (req,res)=>{
  const postId = req.params.id;
 
  const post = await Post.findById(postId);

  if(!post){
    return res.status(404).json({sucess:false, message:"post not found"});
  }
  
  // console.log(req.user._id);
  // console.log(post.userId);

  if(req.user._id == post.userId){
   try {
    await post.updateOne({$set: req.body});
    res.json({sucess:true,post});
   } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
   }
  }else{
   res.status(403).json({sucess:false, message:"you can edit only your posts"});
  }

}


exports.deletePost = async (req,res)=>{
  const postId = req.params.id;
 
  const post = await Post.findById(postId);

  if(!post){
    return res.status(404).json({sucess:false, message:"post not found"});
  }
  
  console.log(req.user._id);
  console.log(post.userId);

  if(req.user._id == post.userId){
   try {
    await post.deleteOne();
    res.json({sucess:true,message:"your post has been deleted"});
   } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
   }
  }else{
   res.status(403).json({sucess:false, message:"you can delete only your posts"});
  }
}

exports.likePost = async(req,res)=>{
  const userId = req.user._id;
 try {
  const post = await Post.findById(req.params.id);
  if(post.likes.includes(req.user._id)){
    await post.updateOne({ $pull: { likes: userId } });
      res.json({sucess:true,message:"you disliked the post"})
  }else{
    await post.updateOne({ $push: { likes: userId } });
    res.json({sucess:true,liked:true,message:"you liked the post"})
  }
 } catch (error) {
  res.status(500).json({sucess:false,liked:false, message:error.message});
 }
}