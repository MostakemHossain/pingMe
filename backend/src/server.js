import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from "./routes/message.route.js";

const app= express();
dotenv.config();
const PORT= process.env.PORT || 4500;


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

 app.get('/test',(req,res)=>{
    res.send("Hello from Express server!");
});