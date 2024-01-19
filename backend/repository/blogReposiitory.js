const Blog= require('../models/blogModel')

class BlogRepository{
    async createBlog(blogData){
        try {
            const newBlog = await Blog.create(blogData);
            return newBlog;
          } catch (error) {
              console.error(error);
            throw new Error('Failed to create the blog');
          }
        }
        async myblogs(userId) {
          try {
            const blog = await Blog.find({ user: userId });
            return blog;
          } catch (error) {
            console.error('Error fetching blogs:', error);
            throw new Error('Failed to fetch blogs'); 
          }
        }
        async editBlogData(blogId, blogData) {
          try {
            const blog = await Blog.findById(blogId);
        
            if (!blog) {
              throw new Error('Blog not found');
            }
           blog.title = blogData.title || blog.title;
            blog.description = blogData.description || blog.description;
            blog.coverImage = blogData.coverImage || blog.coverImage;
        
            await blog.save(); 
        
            return blog; 
          } catch (error) {
            console.error('Error editing blog data:', error);
            throw new Error('Failed to update blog data');
          }
        }
        
        async deleteBlog(id) {
          try {
            const result = await Blog.deleteOne({ _id: id });
           
            return result; 
          } catch (error) {
            console.error('Error deleting blog:', error);
            throw new Error('Failed to delete blog');
          }
        }
        async  getAllBlogs(page, limit) {
          try {
            const totalCount = await Blog.countDocuments();
            const blogs = await Blog.find()
              .populate('user', 'fullName')
              .skip((page - 1) * limit)
              .limit(limit);
        
            return { blogs, totalCount };
          } catch (error) {
            console.error('Error fetching blogs:', error);
            throw new Error('Failed to fetch blogs');
          }
        }
        async  getBlogById(blogId) {
          try {
            const blogDetails = await Blog.findById(blogId)
            .populate('user', 'fullName')
            .populate({
              path: 'comments',
              populate: {
                path: 'user',
                select: 'fullName',
              },
              options: {
                sort: { createdAt: -1 }, 
              },
            });
          

        
            return blogDetails;
          } catch (error) {
            console.error('Error fetching blog by ID:', error);
            throw new Error('Failed to fetch blog by ID');
          }
        }
        
        async  addCommentId(blogId, commentId) {
          try {
            const blog = await Blog.findById(blogId);
            
            if (!blog) {
              throw new Error('Blog not found');
            }
        
            blog.comments.push(commentId);
            await blog.save();
            
            return blog;
          } catch (error) {
            console.error('Error adding comment ID to blog:', error);
            throw new Error('Failed to add comment ID to blog');
          }
        }
        async removeCommentFromBlog(blogId, commentIdToRemove) {
          try {
            const blog = await Blog.findById(blogId);
           if (!blog) {
              throw new Error("Blog not found");
            }
           blog.comments = blog.comments.filter(
              (commentId) => commentId.toString() !== commentIdToRemove.toString()
            );
            await blog.save();
             } catch (error) {
            console.error("Error removing comment from blog:", error);
            throw error;
          }
        }
        async getHomeBlog(){
         try{
          const blogs = await Blog.find().sort({ createdAt: -1 }).limit(8);
          return blogs

         }catch (error) {
            console.error("Error gettting  blogs:", error);
            throw error;
        }
      }
}
module.exports=BlogRepository