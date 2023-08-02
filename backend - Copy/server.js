require('dotenv').config('./');
const express = require("express");
const app = express();
const PORT =process.env.PORT || 4000;
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const privateRouter = require('./router/private');
const postRouter = require('./router/post');
const commentRouter = require('./router/comment');
const connectDB = require('./config/db');
const { protect } = require('./middleware/auth');
const cors = require('cors');

connectDB();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin:"http://localhost:5173"
}
));

app.get('/',(req,res)=>{    
 return res.json('the server is online');
});

app.use('/auth',authRouter);

app.use('/private',privateRouter);
app.use(protect);
app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);

app.listen(PORT,()=>{
 console.log(`the server is listening at ${PORT}`);
});