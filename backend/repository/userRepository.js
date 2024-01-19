const User = require("../models/userModels");

class UserModel {
  async createUser(studentData) {
    try {
      const newUser = await User.create(studentData);
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a student user");
    }
  }
  async getUserByEmail(studentEmail) {
    try {
      const user = await User.findOne({ email: studentEmail });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error("Failed to get user by email");
    }
  }
  async createUserByGauth(studentData) {
    try {
      const newUser = new User({
        ...studentData,
        isGoogle: true,
      });

      await newUser.save();

      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a student user");
    }
  }
  async updateField(email, fieldName, fieldValue) {
    try {
      return User.findOneAndUpdate(
        { email },
        { $set: { [fieldName]: fieldValue } }
      );
    } catch (error) {
      console.error("Error updating field:", error);
    }
  }

  async getUserByID(user_id) {
    try {
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error("Failed to get user by email");
    }
  }
  async getAllUsers() {
    try {
      const nonAdminUsers = await User.find({ isAdmin: { $ne: true } });
      return nonAdminUsers;
    } catch (error) {
      console.error("Error fetching non-admin users:", error);
    }
  }

  async updateAccess(email, fieldName, fieldValue) {
    try {
      const result = await User.findOneAndUpdate(
        { email },
        { $set: { [fieldName]: fieldValue } },
        { new: true }
      );

      return result;
    } catch (error) {
      console.error("Error updating access:", error);
    }
  }

  async updateUserProfile(editDetails, studentId) {
    try {
      const user = await this.getUserByID(studentId);
      if (!user) {
        throw new Error("User not found");
      }

      user.fullName = editDetails.fullName;
      user.userName = editDetails.username;
      user.phoneNumber = editDetails.phoneNumber;

      await user.save();

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating user profile");
    }
  }

  async getCount() {
    try {
      const totalStudents = await User.find().count();
      return totalStudents;
    } catch (error) {
      console.error("Error fetching total students count:", error);
    }
  }
}

module.exports = UserModel;
