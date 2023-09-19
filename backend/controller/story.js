const Story = require("../model/Story");

exports.postStory = async(req,res)=>{
 if(!req.user) res.status(400).json({sucess:false, message:'you are not authorized'});
 
 try {
    const {imgUrl,videoUrl} = req.body;
    if(!imgUrl && !videoUrl){
        return res.status(500).json({sucess:false, message:'please provide a video or image url'});
    };
    const story = await Story.create({
        userId:req.user._id,
        videoUrl,
        imgUrl
    });

    res.status(201).json({sucess:true,story});
 } catch (error) {
    res.status(500).json({sucess:false, message:error.message});
 }
};

exports.getFollowingStories =async(req,res)=>{
 if(!req.user) res.status(400).json({sucess:false, message:'you are not authorized'});
 
 try {
    const followings = req.user.followings;
    const userId = req.user._id;
    
   /*  const stories = followings.map(async(following)=>{
      //  console.log(following);
     const res = await Story.find({userId:following})
      //  console.log(res);
      return res;
    }); */
   
 const userStory = await Story.findOne({userId});  
 const followingsStories = await Story.find({userId:{$in:followings}});
 
 const stories = [userStory,...followingsStories]
 console.log(stories);
    res.status(201).json({sucess:true,stories});
} catch (error) {
    res.status(500).json({sucess:false, message:error.message});
}
}
 /* await Story.find({userId:req.user.followings[0]});    */ 