const  express = require( 'express');
const router=express.Router();
const {getStudents, updateAccess, requestedTeachers, teacherApprovel,getTeachers}=require('../controller/adminController')

router.get('/students',getStudents)
router.put('/updateAccess',updateAccess)
router.get('/teacherApprovel', requestedTeachers)
router.put('/updateTeacherApprovel',teacherApprovel)
router.get('/teachers',getTeachers)

module.exports=router