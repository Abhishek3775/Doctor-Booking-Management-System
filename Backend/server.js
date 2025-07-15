import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config()

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDb()
connectCloudinary()

//middlewares 
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


//api end points
app.use("/api/admin",adminRouter)//localhost:4000/api/add-doctor
app.use("/api/doctor",doctorRouter)
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
res.send("hello , this is basix setup of our backend project ");
})

app.listen(port,()=>{
  
    console.log("server is listening on the port",port)
})