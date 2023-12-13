const { imageUpload } = require("../utils/cloudinery/upload");
const {  uploadVideo } = require("../utils/compress");
const CourseUpload =require('../repository/courseModal')
const TeacherModel =require('../repository/teacherModel')



const CourseDB=new CourseUpload()
const teacherDB= new TeacherModel()


const uploadCourseDetails = async (req, res) => {
  try {
    const courseDetails = req.body;
    console.log(courseDetails.teacherEmail);
    const teacher = await teacherDB.getTeacherByEmail(courseDetails.teacherEmail);
    console.log(teacher._id);
    const files = req.files; 
    if (!files || !files.demoVideo) {
      return res.json({ error: true, message: 'Demo video file is missing.' });
    }
    const demoVid = await uploadVideo(files.demoVideo);
    const coverPhoto= await imageUpload(files.coverPhoto)
    const result =await CourseDB.newCourseDetails(courseDetails,coverPhoto,demoVid,teacher._id)
    console.log(result);
  res.json({ error: false, message: 'Course details uploaded successfully' });
  } catch (error) {
    console.error('Error in uploading course details:', error);
    res.json({ error: true, message: 'Internal server error' });
  }
};

const getUploadCourses = async (req, res) => {
  try {
    const teacherId=req.user.id
    console.log('hi');
    const uploadCourses = await CourseDB.getuploadCourseDetails(teacherId);
    console.log(uploadCourses);
    return res.json({ error: false, uploadCourses });
  } catch (error) {
    console.error('Error fetching upload courses:', error);
    return res.json({ error: true, message: 'Error fetching upload courses' });
  }
};

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
      const editData = await CourseDB.updateUploadCourseDetails(coursedata, coursedata.course_id);
      return res.json({ error: false, message: 'Successfully updated', editData });
    }

    const editData = await CourseDB.updateUploadCourseDetailsWithoutFiles(coursedata, coursedata.course_id);
    return res.json({ error: false, message: 'Successfully updated', editData });
  } catch (error) {
    return res.json({ error: true, message: 'Error occurred while updating course details', details: error.message });
  }
};

const addChapters=async(req,res)=>{
  const teacherId=req.user.id
  const chapterData= req.body
  const file=req.files
  console.log(chapterData,file);
  const chapterVideo = await uploadVideo(file.chapterVideo);
  const coverPhoto= await imageUpload(file.chapterCoverImage)
  console.log(chapterVideo,coverPhoto);
  const chapterDetails={
    chapterIndex:chapterData.chapterIndex,
    chapterHeadline:chapterData.chapterHeadline,
    chapterVideo:chapterVideo,
    chapterCoverImage:coverPhoto,
  }
   const index=await CourseDB.existingIndex(chapterData.courseId,chapterData.chapterIndex)
    if(index){
      const result =await CourseDB.addChapters(chapterData.courseId,chapterDetails)
      console.log(result);
      const courseDetails= await CourseDB.getUploadCourseById(chapterData.courseId)
      console.log(courseDetails);
      return res.json({error:false,message:'successfully added',courseDetails})
    }else{
      return res.json({error:true,message:'index already exist'})
    }
}
const confirmCourse = async (req, res) => {
  try {
    const course_id = req.body.course_id;
    console.log(course_id);
   const isUpload=true
    // Update the field 'isUpload' to 'true' for the specified course_id
    const result = await CourseDB.updateField(course_id, "isUpload", isUpload);
    console.log(result);

    // Send a success response or perform other actions based on the result
    res.json({ error:false, message: 'Field updated successfully', result });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.json({ error:true,message: 'Internal server error' });
  }
};

module.exports = {uploadCourseDetails,
                  getUploadCourses,
                  editCourseDetails,
                  addChapters,
                  confirmCourse,

                 };



