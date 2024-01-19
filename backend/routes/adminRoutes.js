const  express = require( 'express');
const router=express.Router();
const {getStudents, updateAccess, requestedTeachers, teacherApprovel,getTeachers, addCategory, editCategoryName, getCategories, getAllPayments, teacherPayment, editCategoryimage, getDashCard, teacherAccess, }=require('../controller/adminController');
const { verify } = require('jsonwebtoken');

router.get('/students',verify,getStudents)
router.put('/updateAccess/:id',verify,updateAccess)
router.put('/teacherAccess/:id',verify,teacherAccess)
router.get('/teacherApprovel',verify, requestedTeachers)
router.put('/updateTeacherApprovel/:id',verify,teacherApprovel)
router.get('/teachers',verify,getTeachers)
router.post('/createCategory',verify,addCategory)
router.put('/editCategoryName/:id',verify,editCategoryName)
router.put('/editCategoryimage/:id',verify,editCategoryimage)
router.get('/categories',verify,getCategories)
router.get('/transactions',verify,getAllPayments)
router.put('/vendorPay/:id',verify,teacherPayment)
router.get('/dashCard',verify,getDashCard)

module.exports=router