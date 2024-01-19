const Teacher = require("../models/teacherModel");

class TeacherModel {
  async createTeacher(teacherData, certificate, teacherId) {
    try {
      const newTeacher = new Teacher({
        fullName: teacherData.fullName,
        email: teacherData.email,
        phoneNumber: teacherData.phoneNumber,
        password: teacherData.password,
        lastQualification: teacherData.lastQualification,
        bankAccountNo: teacherData.bankAccNumber,
        ifcCode: teacherData.ifcCode,
        idProof: teacherId.url,
        certificate: certificate.url,
        isTeacher: true,
      });

      await newTeacher.save();

      return newTeacher;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a student user");
    }
  }
  async getTeacherByEmail(teacherEmail) {
    try {
      const teacher = await Teacher.findOne({ email: teacherEmail });
      if (!teacher) {
        return null;
      }
      return teacher;
    } catch (error) {
      throw new Error("Failed to get user by email");
    }
  }

  async getTeacherByRequested() {
    try {
      const requestedTeachers = await Teacher.find({
        isTeacher: true,
        isApproved: false,
      });

      return requestedTeachers;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching requested teachers");
    }
  }
  async teacherUpdateFeild(email, fieldName, fieldValue) {
    try {
      const result = await Teacher.findOneAndUpdate(
        { email },
        { $set: { [fieldName]: fieldValue } }
      );

      
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async teacherDelete(email) {
    try {
      const result = await Teacher.deleteOne({ email });
      if (result.deletedCount === 1) {
        console.log("Document deleted successfully");
        return result;
      } else {
        console.log("Document not found or not deleted");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getAllTeachers() {
    try {
      const teachers = await Teacher.find();
      return teachers;
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  }
  async getApprovedTeachers() {
    try {
      const teachers = await Teacher.find({isApproved:
        true});
      return teachers;
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  }

  async getTeacherById(techerId) {
    try {
      const teacher = await Teacher.findOne({ _id: techerId });
      if (!teacher) {
        return null;
      }
      return teacher;
    } catch (error) {
      throw new Error("Failed to get user by email");
    }
  }
  async editTeacherProfile(teacherId, editData) {
    try {
      const teacher = await this.getTeacherById(teacherId);
      if (!teacher) {
        throw new Error("User not found");
      }

      teacher.fullName = editData.fullName;
      teacher.bankAccountNo = editData.bankAccountNumber;
      teacher.ifcCode = editData.ifscCode;
      teacher.phoneNumber = editData.phoneNumber;

      await teacher.save();
      return teacher;
    } catch (error) {
      throw new Error("Failed to update");
    }
  }

  async updateProfilepic(teacherId, image) {
    try {
      const result = await Teacher.findOneAndUpdate(
        { _id: teacherId },
        {
          $set: {
            pic: image.url,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getTeacherCount() {
    try {
      const totalTeacher = await Teacher.find().count();
      return totalTeacher;
    } catch (error) {
      console.error("Error fetching total teacher count:", error);
    }
  }
}

module.exports = TeacherModel;
