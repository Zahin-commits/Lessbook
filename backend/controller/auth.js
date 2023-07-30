const User = require("../model/User");

exports.register = async(req,res,next)=>{
 const {username, email, password} = req.body;
 if(!username || !email || !password){
 return res.status(401).json("please provide a valid username, email and password");
 };

 try {
  const user = await User.create({username,email,password});

  snedToken(user,201,res);
    
 } catch (error) {
  res.status(500).json(error.message);
 };
};

exports.login = async(req,res,next)=>{
 const {email,password} = req.body;
 
 if(!email || !password){
  return res.status(401).json({sucess:false, error:"please provide an email and password"});
 }

 try {
  const user = await User.findOne({email});
  if(!user){
    return res.status(401).json({sucess:false, error:"invalid credentials"});
  }

  const isMatch = await user.comparePasswords(password);

  if(!isMatch){
    return res.status(401).json({sucess:false, error:"invalid credentials"});
  }else{
    snedToken(user,200,res); 
  }


 } catch (error) {
  res.status(500).json(error.message);    
 }
};

const snedToken = (user,statusCode,res)=>{
 const token = user.getSignedJwtToken();
  res.status(statusCode).json({sucess:true, token});
}