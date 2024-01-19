const uploadCourse = require("../models/courseModel");
const { ObjectId } = require('mongodb');
class CourseRepository {
  async newCourseDetails(courseDetails, coverPhoto, demoVideo, teacher_id) {
    try {
      const newCourse = new uploadCourse({
        courseName: courseDetails.courseName,
        description: courseDetails.description,
        category: courseDetails.category,
        price: courseDetails.price,
        DiscountPrice: courseDetails.discountPrice,
        courseOutLine: courseDetails.courseOutline,
        coverPhoto: coverPhoto,
        demoVideo: demoVideo,
        teacher_id: teacher_id,
      });

      await newCourse.save();
      return newCourse;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload course");
    }
  }

  async getuploadCourseDetails(_id) {
    try {
      const uploadedCouses = await uploadCourse.find({
        isUpload: false,
        teacher_id: _id,
      });
      return uploadedCouses;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching upload corse deatils");
    }
  }
  async existingIndex(courseId, index) {
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
      throw new Error("Error checking existing chapter index");
    }
  }

  async addChapters(id, chapter) {
    try {
      const result = await uploadCourse.updateOne(
        { _id: id },
        { $push: { chapters: chapter } }
      );

      if (result.nModified === 0) {
        throw new Error("No course found with the given ID");
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error adding chapter to the course");
    }
  }
  async getUploadCourseById(_id) {
    try {
      const uploadedCourse = await uploadCourse.findOne({
        isUpload: false,
        _id: _id,
      });
      return uploadedCourse;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching upload course details");
    }
  }

  async updateUploadCourseDetails(editDetails, course_id) {
    try {
      const course = await this.getUploadCourseById(course_id);
      if (!course) {
        throw new Error("course not found");
      }

      course.courseName = editDetails.courseName;
      course.description = editDetails.description;
      course.category = editDetails.category;
      course.price = editDetails.price;
      course.DiscountPrice = editDetails.discountPrice;
      course.courseOutLine = editDetails.courseOutline;
      course.coverPhoto = editDetails.coverPhoto;
      course.demoVideo = editDetails.demoVideo;

      await course.save();

      return course;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating user profile");
    }
  }
  async updateUploadCourseDetailsWithoutFiles(editDetails, course_id) {
    try {
      const course = await this.getUploadCourseById(course_id);
      if (!course) {
        throw new Error("course not found");
      }

      course.courseName = editDetails.courseName;
      course.description = editDetails.description;
      course.category = editDetails.category;
      course.price = editDetails.price;
      course.DiscountPrice = editDetails.discountPrice;
      course.courseOutLine = editDetails.courseOutline;

      await course.save();

      return course;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating user profile");
    }
  }
  async updateField(course_id, fieldName, fieldValue) {
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
  async getCourses() {
    try {
      const courses = await uploadCourse.find({ isUpload: true }).populate('reviews');

      
      return courses;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching upload corse deatils");
    }
  }
  async getCourseDetails(courseId) {
    try {
      const courseDetails = await uploadCourse.findById(courseId);
      return courseDetails;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching course details");
    }
  }
  async insertUserIdIntoUsersArray(courseId, userId) {
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
  async getMyEntrollments(userId) {
    const courses = await uploadCourse.find({ users: userId })
    return courses;
  }

  async getTeacherCourses(_id) {
    try {
      const uploadedCouses = await uploadCourse.find({
        isUpload: true,
        teacher_id: _id,
      });
      return uploadedCouses;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching corses");
    }
  }
  async getChapterByIndex(courseId, chapterIndex) {
    try{
    const course = await uploadCourse.findById(courseId);
    const chapter = course.chapters.find(
      (obj) => obj.chapterIndex === chapterIndex
    );
    return chapter;
  }  catch (error) {
    console.error('Error fetching chapter by index:', error);
  }
}
  async updateChapterVideo(courseId, chapterIndex, newChapterVideo) {
    try {
      await uploadCourse.updateOne(
        { _id: courseId, "chapters.chapterIndex": chapterIndex },
        { $set: { "chapters.$.chapterVideo": newChapterVideo } }
      );
     } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while updating chapter video");
    }
  }
  async updateChapterTitle(courseId, chapterIndex, title) {
    try {
      await uploadCourse.updateOne(
        { _id: courseId, "chapters.chapterIndex": chapterIndex },
        { $set: { "chapters.$.chapterHeadline": title } }
      );

      
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while updating chapter video");
    }
  }
  async updateChapterCaption(courseId, chapterIndex,caption) {
    try {
      await uploadCourse.updateOne(
        { _id: courseId, "chapters.chapterIndex": chapterIndex },
        { $set: { "chapters.$.caption": caption } }
      );

      
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while updating chaptercaption");
    }
  }
  async  deleteChapter(courseId, chapterIndex) {
    try {
      await uploadCourse.updateOne(
        { _id: courseId },
        { $pull: { chapters: { chapterIndex: chapterIndex } } }
      );
  
      console.log("Chapter deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while deleting the chapter");
    }
  }
  async  deleteCourse(courseId) {
    try {
      const result = await uploadCourse.deleteOne({ _id: courseId });
      console.log(result);
  
      if (result.deletedCount === 0) {
        throw new Error('Course not found or already deleted');
      }
  
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while deleting the course');
    }
  }
  
  async  addReview(courseId, reviewId) {
    try {
      const course = await uploadCourse.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
  
      course.reviews.push(reviewId);
      await course.save();
      return course;
    } catch (error) {
     console.error('Error adding review:', error);
      throw error;
    }
  }
  async  getMyCourse(course_id) {
    try {
      const courses = await uploadCourse
        .findById(course_id)
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            model: "User",
            select: "fullName pic" 
          }
        });
      return courses;
    } catch (error) {
      
      console.error("Error fetching course data:", error);
      throw error; 
    }
  }

  async getTeacherCoursesCount(teacherId) {
    try {
      const totalCourses = await uploadCourse.countDocuments({
        teacher_id: new ObjectId(teacherId),
      });
  
      const uploadedCourses = await uploadCourse.countDocuments({
        teacher_id: new ObjectId(teacherId),
        isUpload: true,
      });
  
      return { totalCourses, uploadedCourses };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  async  getTotalCourse() {
    try {
      const totalCourse = await uploadCourse.countDocuments({ isUpload: true });
      return totalCourse;
    } catch (error) {
      console.error('Error fetching total course count:', error);
      throw error; 
    }
  }
  
  async  handleTeacherCourse(teacher_id, value) {
    try {
      await uploadCourse.updateMany(
        { teacher_id: teacher_id },
        { $set: { isUpload: value } }
      );
      console.log('Update successful'); // Optional: Log success message
    } catch (error) {
      console.error('Error updating courses:', error.message);
      // Handle the error appropriately, e.g., log it or throw a custom error
      throw new Error('Failed to update courses');
    }
  }
  
  
  
}

module.exports = CourseRepository;
