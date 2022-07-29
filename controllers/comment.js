import Comment from "../models/Comment.js";
import { createError } from "../error.js";
import Video from "../models/Video.js";
export const addComment=async(req,res,next)=>{
    try{
        const comment=new Comment({...req.body,userId:req.user.id,videoId:req.params.id});
        await comment.save();
        res.status(200).json("Comment has been added");
   }catch(err){
     next(err);
   }

}
export const deleteComment=async(req,res,next)=>{
  try{
      const comment=await Comment.findById(req.params.CmntId);
      const videoid=comment.videoId;
      const video=await Video.findById(videoid);
      if((req.user.id!==comment.userId) && (req.user.id!==video.userId)) return  next(createError(401,"You are not authenticated to delete this comment"));
      await Comment.findByIdAndDelete(req.params.CmntId);
      res.status(200).json("Comment has been deleted");
 }catch(err){
   next(err);
 }

}
export const getallComment=async(req,res,next)=>{
  try{
      const comments=await Comment.find({videoId:req.params.videoId});
      res.status(200).json(comments);
 }catch(err){
   next(err);
 }

}
