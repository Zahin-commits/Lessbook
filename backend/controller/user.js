const User = require("../model/User")

exports.findAllUser = async (req,res)=>{ 
 const users = await User.find();

 return res.json(users);
}