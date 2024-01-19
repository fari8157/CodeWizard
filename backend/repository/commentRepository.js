const Comment =require('../models/commentModel')

class CommentRepository{
    async createComment(comment){
      try {
       const newComment=await Comment.create(comment)
       return newComment
    } catch (error) {
      console.error('Error creating comment:', error);}}
    async  deleteComment(commentId) {
        try {
          const deletedComment = await Comment.findByIdAndDelete(commentId);
      
          if (!deletedComment) {
            throw new Error("Comment not found");
          }
          
          return deletedComment; // Return the deleted comment
        } catch (error) {
          console.error("Error deleting comment:", error);
          throw error;
        }
      }
}
module.exports=CommentRepository