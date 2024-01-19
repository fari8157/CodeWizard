
require("dotenv").config();
const CategoryRepository = require("../repository/categoryRepository.js");
const BlogRepository = require("../repository/blogReposiitory.js");
const CommentRepository = require("../repository/commentRepository.js");
const CourseRepository = require("../repository/courseRepository.js");
const PaymentRepository = require("../repository/paymentRepository.js");
const CourseReview = require("../repository/ratingRepository.js");
const UserModel = require("../repository/userRepository.js");
const {imageUpload }=require('../utils/cloudinery/upload.js')
const stripe = require('stripe')('sk_test_51OMTNFSB5PePlulF61kGpeJveFyVhDeHMpn8ZYZ1Hw1ibLBZKx2Wo2gzefd4qTCYn3TZFy4rvwh3NNdO0G4BGGyK00dLUCwPJ8');
const userDB = new UserModel();
const courseDB =new CourseRepository()
const paymentDB= new PaymentRepository()
const blogDB=new BlogRepository()
const commentDB=new CommentRepository()
const reviewDB=new CourseReview()
const categoriesDB= new CategoryRepository()
const success_api=process.env.STRIPE_SUCCSS_URL
const cancel_api=process.env.STRIPE_CNCL_URL
const myEnrollment_api=process.env.MYENROLMENT_URL


const profile = async (req, res) => {
    try {
      const userData = await userDB.getUserByID(req.user.id);
      const payments=await paymentDB.getUserPayments(req.user.id)
      return res.json({ error: false, userData,payments });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.json({ error: true, message: 'Error fetching user profile.' });
    }
  };
  
const updateProfile = async (req, res) => {
    try {
        const studentId = req.user.id;
        const editDetails = req.body;
        if (
            !editDetails.fullName || !editDetails.fullName.trim() ||
            !editDetails.username || !editDetails.username.trim() 
          
        ) {
            return res.json({ error: true, message: 'Please provide valid values for all fields' });
        }
        const student = await userDB.updateUserProfile(editDetails, studentId);
        
        if (student) {
            return res.json({ error: false, message: 'Successfully Updated', student });
        }
    } catch (error) {
        console.error(error);
        return res.json({ error: true, message: 'Error updating profile' });
    }
};

 const updateProfilePic = async (req, res) => {
    try {
      const studentId = req.user.id;
      const file = req.files;
  
      if (!file || !file.profilePicture) {
        return res.status(400).json({ error: true, message: 'No file uploaded.' });
      }
  
      const image = await imageUpload(file.profilePicture);
  
      const student = await userDB.getUserByID(studentId);
  
      if (!student) {
        return res.status(404).json({ error: true, message: 'Student not found.' });
      }
  
      await userDB.updateField(student.email, 'pic', image);
  
      const studentData = await userDB.getUserByID(studentId);
      console.log(studentData);
  
      return res.json({ error: false, studentData });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      return res.status(500).json({ error: true, message: 'Error updating profile picture.' });
    }
  };
  
  const getCourses = async (req, res) => {
    try {
      const { search = '', category = '', page = 1, limit = 8, priceRange = '' } = req.query;
  
      const allCourses = await courseDB.getCourses();
      
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
        filteredCourses: paginatedCourses,
        totalPages:  Math.ceil(filteredCourses.length / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: true, message: 'Internal server error' });
    }
  };
  
  
  
  const getCourseDetails = async (req, res) => {
    try {
     
      const courseId = req.params.id;
      const courseDetail = await courseDB.getMyCourse(courseId);
      console.log();
      const allHeadlines = courseDetail.chapters.map(chapter => chapter.chapterHeadline);
      const totalVideos =allHeadlines?allHeadlines.length:0
      if (courseDetail) {
      const courseDetails={
        courseName:courseDetail.courseName,
        description:courseDetail.description,
        coverPhoto:courseDetail.coverPhoto,
        demoVideo:courseDetail.demoVideo,
        price:courseDetail.price,
        DiscountPrice:courseDetail.DiscountPrice,
        totalVideos:totalVideos,
        allHeadlines:allHeadlines,
        users:courseDetail.users,
        courseOutLine:courseDetail.courseOutLine,
        reviews:courseDetail.reviews
      }
   
        return res.json({ error: false, courseDetails });
      } else {
        return res.json({ error: true, message: 'Course details not found' });
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      return res.json({ error: true, message: 'Error fetching course details' });
    }
  };

  const handlePayment = async (req, res) => {
    try {
      const userId = req.user.id;
      const { course_id } = req.body;
     const course = await courseDB.getCourseDetails(course_id);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: course.courseName,
                images: [course.coverPhoto.url],
              },
              unit_amount: course.DiscountPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${success_api}?session_id={CHECKOUT_SESSION_ID}&course_id=${course._id}&user_id=${userId}`,
        cancel_url: `${cancel_api}`,
      
      });
    
     res.json({ id: session.id });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  const handleSuccessPayment = async (req, res) => {
    try {
      const { session_id,user_id,course_id } = req.query;
      const userdata = await userDB.getUserByID(user_id)
      const course = await courseDB.getCourseDetails(course_id)
      await courseDB.insertUserIdIntoUsersArray(course_id,user_id)
     const paymentData = {
        stripe_id: session_id,
        course_id: course._id,
        teacher_id: course.teacher_id,
        amount: course.DiscountPrice,
        user_id: userdata._id,
      };
      const newPayment= await paymentDB.createPayment(paymentData)
      
      res.redirect(`${myEnrollment_api}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const getMyEntrollments = async (req, res) => {
    try {
      const userId = req.params.id;
      const courses = await courseDB.getMyEntrollments(userId);
      res.json({ courses });
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      res.status(500).json({ error: true, message: 'Failed to fetch enrollments', details: error.message });
    }
  };
  
  const newBlog = async (req, res) => {
    try {
      const blogData = req.body;
      const blogImage = req.files ? req.files.image : null;
  
      if (!blogData || !blogData.title || !blogData.content || !blogData.userId) {
        return res.json({ error: true, message: 'Invalid blog data. Please provide title, content' });
      }
  
      if (!blogImage) {
        return res.json({ error: true, message: 'No image file provided for the blog cover.' });
      }
  
      const imageUrl = await imageUpload(blogImage);
  
      const newBlog = {
        title: blogData.title,
        description: blogData.content,
        coverImage: imageUrl,
        user: blogData.userId
      };
  
      const blog = await blogDB.createBlog(newBlog);
      return res.json({ error: false, message: 'Blog created successfully', blog });
    } catch (error) {
      console.error('Error creating blog:', error);
      return res.json({ error: true, message: 'Failed to create blog', details: error.message });
    }
  };
  const myBlog = async (req, res) => {
    try {
      const userId = req.params.userId;
      const blogs = await blogDB.myblogs(userId);
      return res.json({ error: false, blogs });
    } catch (error) {
      console.error('Error fetching user blogs:', error);
      return res.status(500).json({ error: true, message: 'Failed to fetch user blogs', details: error.message });
    }
  };
  const editBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const updatedBlogData = req.body;
      let imageUrl = null;
  
      if (req.files && req.files.image) {
        imageUrl = await imageUpload(req.files.image);
      }
  
      const blog = {
        title: updatedBlogData.title,
        description: updatedBlogData.content,
        coverImage: imageUrl,
      };
  
      const updatedBlog = await blogDB.editBlogData(blogId, blog);
      console.log(updatedBlog);
  
      return res.json({ error: false, message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
      console.error('Error editing blog:', error);
      return res.status(500).json({ error: true, message: 'Failed to update blog', details: error.message });
    }
  };

  const deleteBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const deleteResult = await blogDB.deleteBlog(blogId);
  
      if (deleteResult && deleteResult.deletedCount > 0) {
        return res.json({ error: false, message: 'Deleted successfully' });
      } else {
        return res.json({ error: true, message: 'Blog not found or already deleted' });
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res.json({ error: true, message: 'Failed to delete blog', details: error.message });
    }
  };
  
  const allBlogs = async (req, res) => {
    const { page = 1, limit = 9} = req.query;
  
    try {
      const { blogs, totalCount } = await blogDB.getAllBlogs(+page, +limit);
  
      res.json({
        totalPages: Math.ceil(totalCount / limit),
        currentPage: +page,
        blogs,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  };
  const blogDetails = async (req, res) => {
    try {
      const blogId = req.query.postId;
  
      if (!blogId) {
        return res.json({ error: 'Invalid blog ID' });
      }
     const blogDetails = await blogDB.getBlogById(blogId);
  
      if (!blogDetails) {
        return res.json({ error: 'Blog details not found' });
      }
     return res.json(blogDetails);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      return res.json({ error: 'Failed to fetch blog details' });
    }
  };

  const addComment = async (req, res) => {
    try {
      const userId = req.user.id;
      const comment = req.body.newComment;
      const blogId = req.query.blogId;
  
      console.log(userId, comment, blogId);
  
      const newComment = {
        user: userId,
        content: comment
      };
  
      const saveComment = await commentDB.createComment(newComment);
      const blog = await blogDB.addCommentId(blogId, saveComment._id);
      const blogDetails= await blogDB.getBlogById(blogId)
      return res.json(blogDetails );
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  };

  const addRating = async (req,res)=>{
    try{
    const ratingData=req.body
    console.log(ratingData);
    const review={
     rating:ratingData.rating,
     review:ratingData.review,
     user:ratingData.userId
    }
    const newReview= await reviewDB.createReview(review)
    const course= await courseDB.addReview(ratingData.courseId,newReview._id)
    console.log( newReview,course);
    return res.json({message: "success", course})
  }catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Failed to add rating' });
  }
};
const getMyCourse= async(req,res)=>{
  const course_id=req.params.courseId
  const course=await courseDB.getMyCourse(course_id)
  return res.json(course)
}

const deleteComment = async (req, res) => {
  try {
    const { commentId, blogId } = req.query;
   await blogDB.removeCommentFromBlog(blogId, commentId);
   const result = await commentDB.deleteComment(commentId);
   return res.json({ error:false,message: 'Comment deleted successfully' });
  } catch (error) {
    console.error("Error deleting comment:", error);
   return res.json({error:true,error: 'Failed to delete comment' });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await categoriesDB.getCategories();
    res.json({ error: false, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

const homeBlog= async(req,res)=>{
  try{
  const blog = await blogDB.getHomeBlog()
  res.json(blog)
}catch (error) {
  console.error(error);
  res.status(500).json({ error: true, message: "Internal server error" });
}
};

  
  

module.exports={
    profile,
updateProfile,
updateProfilePic,
getCourses,
getCourseDetails,
handlePayment,
getMyEntrollments,
handleSuccessPayment,
newBlog,
myBlog,
editBlog,
deleteBlog,
allBlogs,
blogDetails,
addComment,
addRating,
getMyCourse,
deleteComment,
getCategories,
homeBlog,
}