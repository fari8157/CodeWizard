const Review=require('../models/courseReview')

class CourseReview{
    async createReview(review){
        try {
            const newReview= await Review.create(review);
            return newReview;
          } catch (error) {
              console.error(error);
            throw new Error('Failed to create the review');
          }
        }
}

module.exports=CourseReview