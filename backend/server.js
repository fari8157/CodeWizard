const express =require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const {corsOptions}=require('./config/cors')
const connectDB = require('./config/db')
const userRouter = require( "./routes/userRoutes")
const adminRouter=require('./routes/adminRoutes')
const teacherRouter=require('./routes/teacherRoutes')
const chatRouter=require('./routes/chatRoutes')
const cookieParser = require('cookie-parser');
const Cloudinary = require('./config/cloudinery');
const fileupload=require("express-fileupload")
const {createServer}=require('http')
const{Server}=require('socket.io')
const configureSocket=require('./config/socket');
const { allowedOrigins } = require('./config/allowedOrigins');

dotenv.config();
const app=express()
const server=createServer(app)
const io = new Server(server,{
  transports: ["websocket", "polling"],
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
configureSocket(io)

app.use(cors(corsOptions));

connectDB()
Cloudinary()
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:"/temp/",
    limits: {fileSize: 100 * 2024 * 1024}
  }))
app.use(cookieParser());
app.use(express.json())
app.use("/",userRouter)
app.use("/admin",adminRouter)
app.use('/teacher',teacherRouter)
app.use('/chat',chatRouter)
app.get("/",(req,res)=>{
    res.send("Api is running")
})
const PORT = process.env.PORT;
server.listen(PORT,console.log(`server started on ${PORT}`))