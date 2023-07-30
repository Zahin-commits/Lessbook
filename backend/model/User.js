const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new schema({
 username:{
  type: String,
  unique:true,
  required:true,
 },
 email:{
  type: String,
  required:true,
  unique: true,
  match: [
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please provide a valid email",
  ],
 },
 password:{
  type: String,
  required:[ true, 'please add a password'],
 },
 profilePic:{
  type: String,
  default:" https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
 },

 coverPicture: {
  type: String,
  default: "https://rb.gy/mc0u8",
},

 gender:{
 type: String,
 enum:['male','female','other'] 
},

followers:{
 type:Array,
 default:[]
},

followings:{
 type:Array,
 default:[]
},

joinedAt:{
 type: Date,
 default: Date.now
}
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
UserSchema.methods.comparePasswords = async function(password){
  console.log(this.password)
 return await bcrypt.compare(password,this.password);
};

UserSchema.methods.getSignedJwtToken = function(){
 return jwt.sign({id:this._id},process.env.JWT_SECRET, 
  {expiresIn: '1d'})
};



const User = mongoose.model('User',UserSchema);

module.exports = User;