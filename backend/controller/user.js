const User = require("../model/User")

exports.findAllUser = async (req,res)=>{ 
 const users = await User.find();

 return res.json(users);
}


exports.findOneUser = async(req,res)=>{
 const username = req.query.username;

 try {
   const user = await User.findOne({username}).select('-password');

    res.json({sucess:true,user});
   } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
 }
}


exports.findUserById = async(req,res)=>{
 const id = req.params.id;
 try {
   const user = await User.findById(id).select('-password');

    res.json({sucess:true,user});
 } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
 }
}

// follow and unfollow an user

exports.followUser = async(req,res)=>{
   if(!req.user._id || !req.params.id){
      return res.status(400).json({sucess:false,message:"you need to provide the id of yours and the useryou want to follow"});
   } 
  if(req.user._id === req.params.id){
   return res.status(400).json({sucess:false,message:"you can not follow yourself"});
  }
try {
   const currentUser = await User.findById(req.user._id);
   if(!currentUser) res.status(404).json({sucess:false,message:"currentUser not fund"});
   const user = await User.findById(req.params.id);
   if(!user) res.status(404).json({sucess:false,message:"user not fund"});
   
   if(!user.followers.includes(req.user._id)){
      await user.updateOne({ $push: { followers: req.user._id } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
    return res.status(200).json({sucess:true,isFollowing:true,message:`user ${user.username} has been followed`});
   }else{
      await user.updateOne({ $pull: { followers: req.user._id } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      return res.status(200).json({sucess:true,isFollowing:false,message:`user ${user.username} has been unfollowed`});
   }

} catch (error) {
   res.status(500).json({sucess:false,message:error.message});
} 

}