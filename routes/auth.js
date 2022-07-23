import express from "express"
import { signup,signin } from "../controllers/authentication.js";
const router=express.Router();
//Signup
router.post("/signup",signup)
//Signin
router.post("/signin",signin)
//Google Sign in
export default router;