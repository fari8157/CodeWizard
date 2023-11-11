const  express = require( 'express');
const router=express.Router();
const {getStudents, updateAccess}=require('../controller/adminController')

router.get('/students',getStudents)
router.put('/updateAccess',updateAccess)


module.exports=router