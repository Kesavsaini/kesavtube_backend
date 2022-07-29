import express from "express"
import { addComment,deleteComment,getallComment} from "../controllers/comment.js";
import { VerifyToken } from "../verify.js";
const router=express.Router();
//create a comment
router.post("/:id",VerifyToken,addComment)
//delete a comment
router.delete("/:CmntId",VerifyToken,deleteComment)
//get all comments
router.get("/:videoId",getallComment)
export default router;