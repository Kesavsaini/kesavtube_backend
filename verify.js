
import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const VerifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(token){
     jwt.verify(token,process.env.JWTKEY,(err,user)=>{
        if(err) return next(createError(401,"You are not authenticated"));
        req.user=user;
        next();
     });
    }else return next(createError(401,"You are not authenticated"))
}