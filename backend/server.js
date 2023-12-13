const express =require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const corsOption=require('./config/cors')
const connectDB = require('./config/db')
const userRouter = require( "./routes/userRoutes")
const adminRouter=require('./routes/adminRoutes')
const teacherRouter=require('./routes/teacherRoutes')
const cookieParser = require('cookie-parser');
const Cloudinary = require('./config/cloudinery');
const fileupload=require("express-fileupload")

dotenv.config();
const app=express()




connectDB()
Cloudinary()
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:"/temp/",
    limits: {fileSize: 100 * 2024 * 1024}
  }))
app.use(cookieParser());
app.use(express.json())
app.use(cors(corsOption));
app.use("/",userRouter)
app.use("/admin",adminRouter)
app.use('/teacher',teacherRouter)
// app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.send("Api is running")
})



const PORT = process.env.PORT;
app.listen(PORT,console.log(`server started on ${PORT}`))