const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.protect = async(req,res,next)=>{
 let token;

 if(req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')){

    token = req.headers.authorization.split(" ")[1];
 }
if(!token){
 return res.status(401).json({sucess:false, error:"please login in or create an account"});
}

try {
 const decode = jwt.verify(token,process.env.JWT_SECRET);

 const user =await User.findById(decode.id).select('-password');
  
  req.user = user;

  next();
 if(!user){
    return res.status(401).json({sucess:false, error:"no user found with this id"});
 }

} catch (error) {
  return res.status(401).json({sucess:false, error:"you are not authorized"});
}

}