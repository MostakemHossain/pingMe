import express from 'express';
import path from "path";
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from "./routes/message.route.js";
import groupRoutes from "./routes/group.route.js";
import { connectDB } from './lib/db.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import { arcjetProtection } from './middleware/arcject.middleware.js';
import { ENV } from './lib/env.js';
import { app, server } from './lib/socket.js';


dotenv.config();
const PORT= process.env.PORT || 4500;
const __dirname= path.resolve(); 
app.use(express.json({
    limit:"5mb"
}));
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/group",groupRoutes);

// make ready for deployment
if(process.env.NODE_ENV==="production"){
 
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get((req, res, next) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

