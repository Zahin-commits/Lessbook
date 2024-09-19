const mongoose = require('mongoose');

// Define the story schema
const storySchema = new mongoose.Schema({
 imgUrl: {
  type:String,
}, 
 videoUrl: {
  type:String,
}, 
 userId: {
  type:String,
  required:true,
  unique:true
}, 
  createdAt: { type: Date, default: Date.now }, // Timestamp when the story was created
});

// Create a TTL index on the createdAt field with a 24-hour expiration time
storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 }); // 24 hours * 60 minutes * 60 seconds

// Create a model based on the schema
 

module.exports = mongoose.model('Story', storySchema);
