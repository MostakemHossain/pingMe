import express from 'express';
import path from "path";
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from "./routes/message.route.js";
import { connectDB } from './lib/db.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import { arcjetProtection } from './middleware/arcject.middleware.js';
import { ENV } from './lib/env.js';

const app= express();
dotenv.config();
const PORT= process.env.PORT || 4500;
const __dirname= path.resolve(); 
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

// make ready for deployment
if(process.env.NODE_ENV==="production"){
 
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get((req, res, next) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

 app.get('/test',arcjetProtection,(req,res)=>{
    res.send("Hello from Express server!");
});