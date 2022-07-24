import express from "express"
import {updateUser,deleteUser,getUser,subscribeUser,unsubscribeUser, likeVideo, dislikeVideo} from "../controllers/user.js";
import { VerifyToken } from "../verify.js";
const router=express.Router();
//update
router.put("/:id",VerifyToken,updateUser)
//delete
router.delete("/:id",VerifyToken,deleteUser)
//getuser
router.get("/find/:id",getUser);
//subscribe
router.put("/subscribe/:id",VerifyToken,subscribeUser)
//unsubscribe
router.put("/unsubscribe/:id",VerifyToken,unsubscribeUser)
//like
router.put("/like/:id",VerifyToken,likeVideo)
//dislike
router.put("/dislike/:id",VerifyToken,dislikeVideo)

export default router;