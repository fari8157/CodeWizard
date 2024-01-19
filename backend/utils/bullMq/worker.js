require("dotenv").config();
const { Worker } = require("bullmq");
const { S3_uploadVideo } = require("../s3Bucket/s3VideoUpload");
const connectDB = require("../../config/db");
const { imageUpload } = require("../cloudinery/upload");
const CourseUpload = require("../../repository/courseRepository");
const CourseDB = new CourseUpload();
connectDB();

const workerHandler = async (job) => {
  switch (job.data.type) {
    case "VideoUpload": {
      try {
       

        const {file, chapterData} = job.data.data;
        // const coverPhoto = await imageUpload(file.chapterCoverImage);
        console.log( chapterData);
        const chapterVideo = await S3_uploadVideo(file.chapterVideo);
       const chapterDetails = {
          chapterIndex: chapterData.chapterIndex,
          chapterHeadline: chapterData.chapterHeadline,
          chapterVideo: chapterVideo,
          caption: chapterData.chapterCaption,
         
        };

        const result = await CourseDB.addChapters(
          chapterData.courseId,
          chapterDetails
        );

        console.log(result);
        const courseDetails = await CourseDB.getUploadCourseById(
          chapterData.courseId
        );
         
        console.log(courseDetails);
        console.log("succeess");
        return;

      } catch (error) {
        console.log(error);
      }
    }
  }
};

const workerOptions = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

const worker = new Worker("testQueue", workerHandler, workerOptions);

console.log("worker Started");
