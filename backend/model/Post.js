const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
 userId:{
 type:String,
 required:true,
 },
 desc:{
 type:String,
 max:450
 },
 img:{
 type:String
 },
 video:{
 type:String
 },
 likes:{
 type:Array,
 default:[]
 }

},  { timestamps: true }); 

module.exports = mongoose.model("Post",PostSchema);