require("dotenv").config();
const { Queue } = require("bullmq");
const { imageUpload } = require("../utils/cloudinery/upload");
const { uploadVideo } = require("../utils/compress");
const CourseUpload = require("../repository/courseRepository");
const TeacherModel = require("../repository/teacherRepository");
const CategoryRepository = require("../repository/categoryRepository");
const { S3_uploadVideo } = require("../utils/s3Bucket/s3VideoUpload");
const PaymentRepository=require("../repository/paymentRepository");
const CategoryDB = new CategoryRepository();
const CourseDB = new CourseUpload();
const teacherDB = new TeacherModel();
const paymentDB =new PaymentRepository()

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

// queue setup
const queues = {
  testQueue: new Queue("testQueue", {
    connection: redisOptions,
  }),
};
const addJobToTestQueue = (job) => queues.testQueue.add(job.type, job);

const uploadCourseDetails = async (req, res) => {
  try {
    const courseDetails = req.body;
    console.log(courseDetails.teacherEmail);
    const teacher = await teacherDB.getTeacherByEmail(
      courseDetails.teacherEmail
    );
    console.log(teacher._id);
    const files = req.files;
    if (!files || !files.demoVideo) {
      return res.json({ error: true, message: "Demo video file is missing." });
    }
    const demoVid = await S3_uploadVideo(files.demoVideo);
    const coverPhoto = await imageUpload(files.coverPhoto);
    const result = await CourseDB.newCourseDetails(
      courseDetails,
      coverPhoto,
      demoVid,
      teacher._id
    );
    console.log(result);
    res.json({ error: false, message: "Course details uploaded successfully" });
  } catch (error) {
    console.error("Error in uploading course details:", error);
    res.json({ error: true, message: "Internal server error" });
  }
};

const getUploadCourses = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const uploadCourses = await CourseDB.getuploadCourseDetails(teacherId);
    return res.json({ error: false, uploadCourses });
  } catch (error) {
    console.error("Error fetching upload courses:", error);
    return res.json({ error: true, message: "Error fetching upload courses" });
  }
};
const getCourseDetails= async(req,res)=>{
  try{
  const {courseId} = req.params;
  const course= await CourseDB.getUploadCourseById(courseId)
  return res.json({course})
  }catch (error) {
    console.error("Error fetching upload courses:", error);
    return res.json({ error: true, message: "Error fetching upload courses" });
  }
}


const editCourseDetails = async (req, res) => {
  try {
    const coursedata = req.body;
    const file = req.files;
    console.log(coursedata, file);

    if (file) {
      const coverPhoto = await imageUpload(file.coverPhoto);
      const demoVideo = await uploadVideo(file.demoVideo);
      coursedata.coverPhoto = coverPhoto;
      coursedata.demoVideo = demoVideo;
      const editData = await CourseDB.updateUploadCourseDetails(
        coursedata,
        coursedata.course_id
      );
      return res.json({
        error: false,
        message: "Successfully updated",
        editData,
      });
    }

    const editData = await CourseDB.updateUploadCourseDetailsWithoutFiles(
      coursedata,
      coursedata.course_id
    );
    return res.json({
      error: false,
      message: "Successfully updated",
      editData,
    });
  } catch (error) {
    return res.json({
      error: true,
      message: "Error occurred while updating course details",
      details: error.message,
    });
  }
};

const addChapters = async (req, res) => {
  try {
    const chapterData = req.body;
    const file = req.files;
    const index = await CourseDB.existingIndex(
      chapterData.courseId,
      chapterData.chapterIndex
    );
  if (!index) {
      res.json({ error: true, message: "index already exist" });
      return
    }

    await addJobToTestQueue({
      type: "VideoUpload",
      data: {
        file,
        chapterData,
      },
    });

    res.status(200).json({ queued: true,message:'chapter added to queue successfully' });
    
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const confirmCourse = async (req, res) => {
  try {
    const course_id = req.body.course_id;
    console.log(course_id);
    const isUpload = true;
    const result = await CourseDB.updateField(course_id, "isUpload", isUpload);
    console.log(result);
    res.json({ error: false, message: "Field updated successfully", result });
  } catch (error) {
    console.error(error);
    res.json({ error: true, message: "Internal server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    console.log("hui");
    const categories = await CategoryDB.getCategories();
    console.log(categories);
    res.json({ error: false, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
const getTeacherDetails=async(req,res)=>{
  try{
  const teacherId = req.params.id;
  console.log(teacherId);
  const teacher=await teacherDB.getTeacherById(teacherId)
  res.json({error:false,teacher})
  }catch(error){
    console.log(error);
  }
}
const getCourses = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { search = '', category = '', page = 1, limit = 8, priceRange = '' } = req.query;

    const allCourses = await CourseDB.getTeacherCourses(teacherId);

    let filteredCourses = allCourses.filter((course) => {
      return (
        course.courseName.toLowerCase().includes(search.toLowerCase()) &&
        (category === '' || course.category === category) &&
         (priceRange === '' ||
          (course.price >= parseInt(priceRange.split('-')[0]) &&
            course.price <= parseInt(priceRange.split('-')[1])))
      );
    });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    res.json({
      courses: paginatedCourses,
      filteredCourses, 
      totalPages: Math.ceil(filteredCourses.length / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

const getTeachetTransaction=async(req,res)=>{
  try {
    const teacherId=req.params.id
    console.log(teacherId)
    const teacherPayments= await paymentDB.getTeacherPayments(teacherId)
    console.log(teacherPayments);
    return res.json({payments:teacherPayments})
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
}

const editTeacherDetails=async(req,res)=>{
  try {
    const teacherId = req.params.id;
    const teacherData = req.body;
    
    const teacher = teacherDB.editTeacherProfile(teacherId, teacherData);
    
    res.json({ message: 'Teacher details updated successfully' });
  } catch (error) {
    console.error('Error editing teacher details:', error);
    res.json({ error: 'An error occurred while updating teacher details' });
}
}


const changeChapterIndex = async (req, res) =>{
  try {
    const {courseId} = req.params;
    const {activeId, overId} = req.body;
    
    const course = await CourseDB.getCourseDetails(courseId);
    if(!course){
      return res.json({message: "course not found"})
    }

    const findIndexById = (id) => course.chapters.findIndex(obj => obj.chapterIndex == id);
    const firstIndex = findIndexById(activeId);
    const secondIndex = findIndexById(overId);
    const removedElement = course.chapters.splice(firstIndex, 1)
    course.chapters.splice(secondIndex, 0, removedElement[0])
    console.log("after",course.chapters);
    await course.save()
    
    res.status(200).json({message: "Index Changed"})
  } catch (error) {
    console.log(error);
  }
}
const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    await CourseDB.updateField(courseId, 'isUpload', false);
    return res.json({ error: false, message: 'Course field updated successfully' });
  } catch (error) {
    console.error('Error updating course field:', error);
    return res.json({ error: true, message: 'Failed to update course field' });
  }
};
const getChapterDetails=async(req,res)=>{
  try{
  const {courseId, chapterIndex}=req.params
 const chapter=await CourseDB.getChapterByIndex(courseId,chapterIndex)
 res.json({error:false,chapter})
}catch (error) {
  console.error('Error updating course field:', error);
  return res.json({ error: true, message: 'Failed to update course field' });
}
};

const editChapterVideo=async(req,res)=>{
  try{
  const{courseId,chapterIndex}=req.params
  const chaprterVideo=req.files.chapterVideo
  const videoUrl= await S3_uploadVideo(chaprterVideo)
  await CourseDB.updateChapterVideo(courseId,chapterIndex, videoUrl)
  return res.json({error:false,message:'video updated suceessfully'})
}catch (error) {
  console.error('Error updating course field:', error);
  return res.json({ error: true, message: 'Failed to update course field' });
}
};

const editChapterTitle=async(req,res)=>{
  try{
  const{courseId,chapterIndex}=req.params
  const chaprterTitle=req.body.chapterValues
  await CourseDB.updateChapterTitle(courseId,chapterIndex,chaprterTitle)
  return res.json({error:false,message:'Title updated suceessfully'})
}catch (error) {
  console.error('Error updating course field:', error);
  return res.json({ error: true, message: 'Failed to update course field' });
}
};
const editChapterCaption=async(req,res)=>{
  try{
  const{courseId,chapterIndex}=req.params
  const chaprterCaption=req.body.caption
  await CourseDB.updateChapterCaption(courseId,chapterIndex,chaprterCaption)
  return res.json({error:false,message:'Title updated suceessfully'})
}catch (error) {
  console.error('Error updating course field:', error);
  return res.json({ error: true, message: 'Failed to update course field' });
}
};


const deleteChapter=async(req,res)=>{
  try{
  const{courseId,chapterIndex}=req.params
  await CourseDB.deleteChapter(courseId,chapterIndex)
  res.json({error:false,message:'Deleted successfully'})
}catch (error) {
  console.error('Error updating course field:', error);
  return res.json({ error: true, message: 'Failed to update course field' });
}
};

const updateProfilepic=async(req,res)=>{
  try{
  const teacherId=req.params.teacherId
  const Profilepic=req.files
  const imageUrl= await imageUpload(Profilepic.profilePic)
  const result=await teacherDB.updateProfilepic(teacherId,imageUrl)
  return res.json({error:false,message:"updated successfully"})
}catch (error) {
  console.error('Error updating course field:', error);
  return res.json({ error: true, message: 'Failed to update course field' });
}
};
const deleteCourse = async (req, res) => {
  const { course_id } = req.params;
  try {
    await CourseDB.deleteCourse(course_id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while deleting the course' });
  }
};

const getTeacherDashboardTransaction=async(req,res)=>{
  try {
    const teacherId=req.params.id
    const teacherPayments= await paymentDB.getTeacherDashboardPayments(teacherId)
    return res.json({payments:teacherPayments})
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
}
const dashCards = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { count, totalAmount } = await paymentDB.getTeacherRevenue(teacherId);
    const { totalCourses, uploadedCourses } = await CourseDB.getTeacherCoursesCount(teacherId);
    const data = {
      studentCount: count,
      totalRevenue: totalAmount,
      totalCourse: totalCourses,
      uploadedCourses: uploadedCourses
    };

    console.log(data);
    
    return res.json({
      error: false,
      data: data  // Corrected this line
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};




module.exports = {
  uploadCourseDetails,
  getUploadCourses,
  getCourseDetails,
  editCourseDetails,
  addChapters,
  confirmCourse,
  getCategories,
  getTeacherDetails,
  getCourses,
  getTeachetTransaction,
  editTeacherDetails,
  changeChapterIndex,
  editCourse,
  getChapterDetails,
  editChapterVideo,
  editChapterTitle,
  deleteChapter,
  updateProfilepic,
  deleteCourse,
  getTeacherDashboardTransaction,
  dashCards,
  editChapterCaption,
};
