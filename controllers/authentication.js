import User from "../models/User.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { createError } from "../error.js";
export const signup=async(req,res,next)=>{
    try{
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const user=new User({...req.body,password:hash});
      await user.save();
      res.status(200).send("User has been created");
    }catch(err){
       next(err);
    }
}
export const signin=async(req,res,next)=>{
    try{
        const user=await User.findOne({name:req.body.name});
        if(!user) return next(createError(404,"User not found"));
        const checkPass=await bcrypt.compare(req.body.password,user.password);
        if(!checkPass) return next(createError(401,"Authentication Error"));
        const token = Jwt.sign({id:user._id},process.env.JWTKEY);
        const {password,...others}=user._doc
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(others);
    }catch(err){
       next(err);
    }
}