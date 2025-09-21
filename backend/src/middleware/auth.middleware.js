import jwt from "jsonwebtoken"
import { ENV } from "../lib/env.js";
import { User } from "../models/User.js";

export const auth=async(req,res,next)=>{
    try {
        const token=req.cookies?.token;
        
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decoded=jwt.verify(token,ENV.JWT_SECRET);
        console.log(decoded);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"})
        }
        const user= await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        console.log(user);
        req.user=user;
        next();
        
    } catch (error) {
        console.error("Auth middleware error:",error);
        return res.status(401).json({message:"Unauthorized"})
        
    }

}
