import User from "../models/User.js";
import { createError } from "../error.js";
import Video from "../models/Video.js";
export const updateUser=async(req,res,next)=>{
   if(req.user.id===req.params.id){
    try{
     const updateduser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
     res.status(200).json(updateduser);
   }catch(err){
     next(err);
   }
}else return next(createError(401,"Authentication error"))
}
export const deleteUser=async(req,res,next)=>{
    if(req.user.id===req.params.id){
        try{
          await User.findByIdAndDelete(req.params.id);
         res.status(200).json("User has been deleted");
       }catch(err){
         next(err);
       }
    }else return next(createError(401,"Authentication error"))
}
export const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
      next(err);
    }
}
export const subscribeUser=async(req,res,next)=>{
    try{
      await User.findByIdAndUpdate(req.user.id,{$push:{subscribedUsers:req.params.id}},{new:true});
      await User.findByIdAndUpdate(req.params.id,{$inc:{subscribers:1}},{new:true});
      res.status(200).json("Subscription SuccessFull");
    }catch(err){
      next(err);
    }
}
export const unsubscribeUser=async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{$pull:{subscribedUsers:req.params.id}},{new:true});
        await User.findByIdAndUpdate(req.params.id,{$inc:{subscribers:-1}},{new:true});
        res.status(200).json("Unubscription SuccessFull");
      }catch(err){
        next(err);
      }
}
export const likeVideo=async(req,res,next)=>{
  try{
      const video=await Video.findByIdAndUpdate(req.params.id,{
        $addToSet:{likes:req.user.id},
        $pull:{dislikes:req.user.id}
      },{new:true});
      res.status(200).json("Video has been liked");
    }catch(err){
      next(err);
    }
}
export const dislikeVideo=async(req,res,next)=>{
  try{
    const video=await Video.findByIdAndUpdate(req.params.id,{
      $addToSet:{dislikes:req.user.id},
      $pull:{likes:req.user.id}
    },{new:true});
    res.status(200).json("Video has been disliked");
  }catch(err){
    next(err);
  }
}