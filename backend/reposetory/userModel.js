const User= require("../models/userModels")







class UserModel{
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
      async createUserByGauth(studentData) {
        try {
          let newUser = new User({
            ...studentData,
            isGoogle: true,
          });
      
          await newUser.save();
      
          return newUser;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a student user');
        }
      }
      async updateField  (email, fieldName, fieldValue)  {

          return User.findOneAndUpdate({ email }, { $set:{ [fieldName]: fieldValue }});

      };

      async getUserByID(user_id){
        try {
          const user = await User.findOne({ _id:user_id });
          if (!user) {
            return null; // Return null when user is not found
          }
          return user;
        } catch (error) {
          throw new Error('Failed to get user by email');
        }
      }
      async getAllUsers(){
        const nonAdminUsers = await User.find({ isAdmin: { $ne: true } })
        return nonAdminUsers
      }
      
      async  updateAccess(email, fieldName, fieldValue) {
        const result = await User.findOneAndUpdate(
          { email },
          { $set: { [fieldName]: fieldValue } },
          { new: true } // This option returns the updated document
        );
      
        return result;
      }
      
      
}

module.exports= UserModel