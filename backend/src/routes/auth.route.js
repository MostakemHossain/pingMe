import express from "express";
import { login, logout, signUp,updateProfile } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcject.middleware.js";

const router= express.Router();

// router.use(arcjetProtection); 
router.post("/sign-up",signUp);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",auth,updateProfile);

router.get("/check",auth, (req,res)=>{
    return res.status(200).json({message:"Authorized",user:req.user})
})

export default router;