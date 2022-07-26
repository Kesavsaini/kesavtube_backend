import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import videoRoute from "./routes/videos.js"
import commentRoute from "./routes/comments.js"
const app=new Express();
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected")).catch((err)=>console.log(err));
app.use(cors())
app.use(Express.json());
app.use(cookieParser())
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/video",videoRoute);
app.use("/api/comment",commentRoute);
app.use((err,req,res,next)=>{
    const status= err.status || 500;
    const message=err.message || "something went wrong";
    return res.status(status).json({
        sucsess:false,
        status,
        message
    });
})
app.listen(8000,()=>{
    console.log("connected to the server");
})
