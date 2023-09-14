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