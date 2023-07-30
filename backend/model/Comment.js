const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CommentSchema = new schema ({
userId:{
 type:String,
 required:true
},

 postId:[{type: schema.Types.ObjectId,
    ref: 'Post',
 required:true
} ],

text:{
 type:String,
 max:150
},
},  { timestamps: true });

module.exports = mongoose.model("Comment",CommentSchema);