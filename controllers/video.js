import Video from "../models/Video.js";
import { createError } from "../error.js";
import User from "../models/User.js";
export const addVideo=async(req,res,next)=>{
    try{
        const video=new Video({...req.body,userId:req.user.id})
        const newVideo=await video.save();
        res.status(200).json(newVideo);
   }catch(err){
     next(err);
   }

}
export const updateVideo=async(req,res,next)=>{
    try{
     const video=await Video.findById(req.params.id);
     if(!video) return next(createError(404,"Video not found"));
     if(video.userId!==req.user.id) return next(createError(401,"You are not authenticated to update this video"));
     const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
     res.status(200).json(updatedVideo);
   }catch(err){
     next(err);
   }

}
export const deleteVideo=async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found"));
        if(video.userId!==req.user.id) return next(createError(401,"You are not authenticated to delete this video"));
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("Video has been deleted");
      }catch(err){
        next(err);
      }
}
export const getVideo=async(req,res,next)=>{
    try{
     const video=await Video.findById(req.params.id);
     res.status(200).json(video)
   }catch(err){
     next(err);
   }

}
export const viewVideo=async(req,res,next)=>{
    try{
     await Video.findByIdAndUpdate(req.params.id,{$inc:{views:1}});
     res.status(200).json("Video Views increased");
   }catch(err){
     next(err);
   }

}
export const randomVideos=async(req,res,next)=>{
    try{
     const videos=await Video.aggregate([{$sample:{size:40}}]);
     res.status(200).json(videos);
   }catch(err){
     next(err);
   }

}
export const trendVideos=async(req,res,next)=>{
    try{
        const videos=await Video.find().sort({views:-1});
        res.status(200).json(videos);
   }catch(err){
     next(err);
   }

}
export const subscribedVideos=async(req,res,next)=>{
    try{
     const user=await User.findById(req.user.id);
     const subChenals=user.subscribedUsers;
     const Videos=await Promise.all(
        subChenals.map((chenalId)=>{
            return Video.find({userId:chenalId});
        })
     );
     res.status(200).json(Videos.flat().sort((a,b)=> b.createdAt-a.createdAt));
   }catch(err){
     next(err);
   }

}
export const GetVideosByTag=async(req,res,next)=>{
  const tags=req.query.tags.split(",");
  try{
      const videos=await Video.find({tags:{$in:tags}});
      res.status(200).json(videos);
 }catch(err){
   next(err);
 }

}
export const GetVideosBySearch=async(req,res,next)=>{
  const q=req.query.q;
  try{
      const videos=await Video.find({title:{$regex:q,$options:"i"}});
      res.status(200).json(videos);
 }catch(err){
   next(err);
 }

}