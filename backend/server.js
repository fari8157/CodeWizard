const express =require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const corsOption=require('./config/cors')
const connectDB = require('./config/db')
const userRouter = require( "./routes/userRoutes")
const adminRouter=require('./routes/adminRoutes')
const cookieParser = require('cookie-parser');


dotenv.config();
const app=express()




connectDB()
app.use(cookieParser());
app.use(express.json())
app.use(cors(corsOption));
app.use("/",userRouter)
app.use("/admin",adminRouter)

app.get("/",(req,res)=>{
    res.send("Api is running")
})



const PORT = process.env.PORT;
app.listen(PORT,console.log(`server started on ${PORT}`))