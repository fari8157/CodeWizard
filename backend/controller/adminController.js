const UserModel = require("../repository/userRepository.js");
const TeacherModel = require("../repository/teacherRepository.js");
const { sendTeacherConfirmaion } = require("../utils/sendEmail.js");
const { imageUpload } = require("../utils/cloudinery/upload.js");
const CategoryRepository = require("../repository/categoryRepository.js");
const PaymentRepository = require("../repository/paymentRepository.js");
const CourseRepository = require("../repository/courseRepository.js");
const userDB = new UserModel();
const teacherDB = new TeacherModel();
const categoryDB = new CategoryRepository();
const paymentDB = new PaymentRepository();
const courseDB = new CourseRepository();

const getStudents = async (req, res) => {
  try {
    const students = await userDB.getAllUsers();

    return res.json({ students });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const updateAccess = async (req, res) => {
  try {
    const { email, isAccess } = req.body;
    const updateAccess = !isAccess;
    console.log(updateAccess);
    const result = await userDB.updateAccess(email, "isAccess", updateAccess);
    console.log(result.email, result.isAccess);
    return res.json({ email: result.email, isAccess: result.isAccess });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
const teacherAccess = async (req, res) => {
  try {
    const teacher_id=req.params.id
    const { email, isAccess } = req.body;
    const updateAccess = !isAccess;
    if(updateAccess){
    await courseDB.handleTeacherCourse(teacher_id,true)
  }else{
    await courseDB.handleTeacherCourse(teacher_id,false)
    }
    const result = await teacherDB.teacherUpdateFeild(email, "isAccess", updateAccess);
 
    return res.json({ email: result.email, isAccess: result.isAccess });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const requestedTeachers = async (req, res) => {
  try {
    const teachers = await teacherDB.getTeacherByRequested();
    console.log(teachers);
    return res.json({ teachers });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const teacherApprovel = async (req, res) => {
  try {
    const { email, isApprovel } = req.body;
    console.log(isApprovel);
    if (isApprovel) {
      const approved = await teacherDB.teacherUpdateFeild(
        email,
        "isApproved",
        isApprovel
      );
      
      const content = "your teacher request  accepted upload your videos";
      sendTeacherConfirmaion(approved.email, approved.fullName, content);
      return res.json({
        error: false,
        email: approved.email,
        message: "Application Approved successfully",
      });
    } else {
      const teacherDetails = await teacherDB.getTeacherByEmail(email);
      console.log(teacherDetails);
      const declined = await teacherDB.teacherDelete(email);
      console.log(declined);

      const content = "your request rejected resubmit your details again";
      sendTeacherConfirmaion(email, teacherDetails.fullName, content);
      return res.json({
        error: false,
        email: teacherDetails.email,
        message: "Application Rejected",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherDB.getApprovedTeachers();

    return res.json({ teachers });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
const addCategory = async (req, res) => {
  try {
    const categoryName = req.body.name;
    const categoryImage = req.files.image;
    console.log(categoryName, categoryImage);
    const existingCategory = await categoryDB.existCategory(categoryName);
    if (existingCategory) {
      return res.json({ error: true, message: "Category Already exist" });
    }
    const ImageUrl = await imageUpload(categoryImage);
    const category = await categoryDB.createCategory(categoryName, ImageUrl);
    if (category) {
      return res.json({ error: false, message: "category saved successfully" });
    }
    return res.json({ error: true, message: "Try again later." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
const editCategoryName = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryName = req.body.name;
    const category = await categoryDB.getCategoryById(categoryId);
    if (!category) {
      return res.json({ error: true, message: "Category not exist" });
    }
    if (categoryName) {
      const existingCategory = await categoryDB.existCategory(categoryName);
      if (existingCategory) {
        return res.json({ error: true, message: "Category Already exist" });
      }
    }

    const categoryEdit = await categoryDB.updateCategoryName(
      categoryId,
      categoryName
    );
    res.json({ error: false, message: "updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
const editCategoryimage = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryImage = req.files.image;
    const image = await imageUpload(categoryImage);
    await categoryDB.updateCategoryimage(categoryId, image);
    res.json({ error: false, message: "updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryDB.getCategories();
    res.json({ categories: categories });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentDB.getAllPayments();
    return res.json({ payments });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const teacherPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    console.log(paymentId);
    const isPaid = true;
    const result = await paymentDB.UpdateFeild(
      paymentId,
      "isTeacherPay",
      isPaid
    );
    console.log(result);
   res.json({ error: false, message: "paid successfully", result });
  } catch (error) {
    
    console.error(error);
    res.json({ error: true, message: "Internal server error" });
  }
};


const getDashCard = async (req, res) => {
  try {
    const totalStudents = await userDB.getCount();
    const totalCourses = await courseDB.getTotalCourse();
    const totalTeacher = await teacherDB.getTeacherCount();
    const totalRevenue = await paymentDB.getTotalRevenue();

    return res.json({ totalStudents, totalCourses, totalTeacher, totalRevenue });
  } catch (error) {
    console.error('Error fetching dashboard card data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getStudents,
  updateAccess,
  requestedTeachers,
  teacherApprovel,
  getTeachers,
  addCategory,
  editCategoryName,
  getCategories,
  getAllPayments,
  teacherPayment,
  editCategoryimage,
  getDashCard,
  teacherAccess,
};
