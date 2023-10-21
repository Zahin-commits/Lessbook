require('dotenv').config('./');
const express = require("express");
const app = express();
const PORT =process.env.PORT || 4000;
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const privateRouter = require('./router/private');
const postRouter = require('./router/post');
const commentRouter = require('./router/comment');
const storyRouter = require('./router/story')
const connectDB = require('./config/db');
const { protect } = require('./middleware/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(cors({
    credentials: true,
    origin:"https://lessbook-ju9z.vercel.app"
    // origin:"http://localhost:5173"
}
));

app.use(cookieParser());

app.get('/',(req,res)=>{    
 return res.json('the server is online');
});

app.use('/auth',authRouter);

app.use('/private',privateRouter);
app.use(protect);
app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);
app.use('/story',storyRouter);

app.listen(PORT,()=>{
 console.log(`the server is listening at ${PORT}`);
});