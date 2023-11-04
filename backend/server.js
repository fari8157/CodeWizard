const express =require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const corsOption=require('./config/cors')
const connectDB = require('./config/db')
const userRouter = require( "./routes/userRoutes")
dotenv.config();
const app=express()




connectDB()
app.use(express.json())
app.use(cors(corsOption));
app.use("/",userRouter)

app.get("/",(req,res)=>{
    res.send("Api is running")
})



const PORT = process.env.PORT;
app.listen(PORT,console.log(`server started on ${PORT}`))