import express from "express"
import { signup,signin, GoogleSignin } from "../controllers/authentication.js";
const router=express.Router();
//Signup
router.post("/signup",signup)
//Signin
router.post("/signin",signin)
//Google Sign in
router.post("/signin/google",GoogleSignin)
export default router;