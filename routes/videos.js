import express from "express"
import { addVideo, deleteVideo, getVideo, randomVideos, subscribedVideos, trendVideos, updateVideo, viewVideo } from "../controllers/video.js";
import { VerifyToken } from "../verify.js";
const router=express.Router();
// create a video
router.post("/add",VerifyToken,addVideo)
//update a video
router.put("/:id",VerifyToken,updateVideo)
//delete a video
router.delete("/:id",VerifyToken,deleteVideo)
//get a video
router.get("/find/:id",getVideo)
//upadate views on a video
router.put("/view/:id",viewVideo)
//get trending video
router.get("/trends",trendVideos)
//get random video
router.get("/random",randomVideos)
//get Subscribed chennal videos
router.get("/subs",VerifyToken,subscribedVideos)
export default router;