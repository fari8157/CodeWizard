const uploadCourse= require("../models/courseModel")

class CourseRepository{
    async newCourseDetails(courseDetails,coverPhoto,demoVideo,teacher_id){
      try {
         let newCourse=new uploadCourse({
            courseName:courseDetails.courseName,
            description:courseDetails.description,
            category: courseDetails.category,
            price:courseDetails.price,
            DiscountPrice:courseDetails.discountPrice,
            courseOutLine: courseDetails.courseOutline,
            coverPhoto:coverPhoto,
            demoVideo:demoVideo,
            teacher_id:teacher_id
         })

         await newCourse.save();
         return newCourse
      } catch (error) {
        console.error(error);
          throw new Error('Failed to upload course');
      }
    }

    async  getuploadCourseDetails(_id){
      try {
        const uploadedCouses = await uploadCourse.find({isUpload:false, teacher_id:_id}); 
        return uploadedCouses; 
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching upload corse deatils');
      }
    }
    async  existingIndex(courseId, index) {
      try {
        const isIndex = await uploadCourse.findOne({
          _id: courseId,
          chapters: { $elemMatch: { chapterIndex: index } },
        });
    
        if (isIndex) {
          return false; 
        }
        
        return true; 
      } catch (error) {
        console.error(error);
        throw new Error('Error checking existing chapter index');
      }
    }
    


    async  addChapters(id, chapter) {
      try {
        const result = await uploadCourse.updateOne(
          { _id: id },
          { $push: { chapters: chapter } }
        );
    
        if (result.nModified === 0) {
          throw new Error('No course found with the given ID');
        }
    
        return result;
      } catch (error) {
        console.error(error);
        throw new Error('Error adding chapter to the course');
      }

}
async  getUploadCourseById(_id) {
  try {
    const uploadedCourse = await uploadCourse.findOne({ isUpload: false, _id: _id });
    return uploadedCourse;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching upload course details');
  }
}

async  updateUploadCourseDetails(editDetails,course_id) {
  try {
   
    const course = await this. getUploadCourseById(course_id);
    if (!course) {
      throw new Error('course not found');
    }

    course.courseName = editDetails.courseName 
    course.description = editDetails.description 
    course.category  = editDetails.category 
    course.price = editDetails.price 
    course.DiscountPrice = editDetails. discountPrice
    course.courseOutLine = editDetails. courseOutline 
    course.coverPhoto  = editDetails.coverPhoto  
    course.demoVideo = editDetails.demoVideo 
    

    await course.save();

    return course;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating user profile');
  }
}
async  updateUploadCourseDetailsWithoutFiles(editDetails,course_id) {
  try {
   
    const course = await this. getUploadCourseById(course_id);
    if (!course) {
      throw new Error('course not found');
    }

    course.courseName = editDetails.courseName 
    course.description = editDetails.description 
    course.category  = editDetails.category 
    course.price = editDetails.price 
    course.DiscountPrice = editDetails. discountPrice
    course.courseOutLine = editDetails. courseOutline 
    
    

    await course.save();

    return course;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating user profile');
  }
}
async  updateField(course_id, fieldName, fieldValue) {
  try {
    const updatedCourse = await uploadCourse.findOneAndUpdate(
      { _id: course_id }, // Use '_id' here
      { $set: { [fieldName]: fieldValue } },
      { new: true } // To return the updated document
    );
    console.log(updatedCourse);
    return updatedCourse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async  getCourses(){
  try {
    const courses= await uploadCourse.find({isUpload:true}); 
    
    return courses; 
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching upload corse deatils');
  }
}
async  getCourseDetails(courseId) {
  try {
    const courseDetails = await uploadCourse.findById(courseId);
    return courseDetails;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching course details');
  }
}
async  insertUserIdIntoUsersArray(courseId, userId) {
  try {
    const updateUsers = await uploadCourse.findByIdAndUpdate(
      courseId,
      { $addToSet: { users: userId } },
      { new: true }
    );
    console.log(updateUsers);
    return updateUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



};


module.exports=CourseRepository