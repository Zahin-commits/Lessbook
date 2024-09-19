const mongoose = require('mongoose');

const connectDB = async ()=>{
 try {
  const connection = await mongoose.connect(process.env.DB_LINK);
    console.log('database connected');
 } catch (error) {
    console.log('error', error);
    process.exit(1);
 };
}

module.exports = connectDB;