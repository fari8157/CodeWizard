const{verify}=require('../middleWare/auth')
const { allMessages, getAllTeachers, listChatStudents }= require ("../controller/chatController");

const  express= require ("express");
const router = express.Router();


router.get("/message/:id",verify, allMessages);
router.get("/teachers",verify, getAllTeachers);
router.get("/listStudents",verify, listChatStudents)

module.exports= router;