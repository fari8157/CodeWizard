const User= require("../models/userModels")


class userModel{
    async createUser(studentData) {
        try {
          const newUser = await User.create(studentData);
          return newUser;
        } catch (error) {
            console.error(error);
          throw new Error('Failed to create a student user');
        }
      }
      async getUserByEmail(studentEmail) {
        try {
          const user = await User.findOne({ email: studentEmail });
          if (!user) {
            return null; // Return null when user is not found
          }
          return user;
        } catch (error) {
          throw new Error('Failed to get user by email');
        }
      }
      
}

module.exports= userModel