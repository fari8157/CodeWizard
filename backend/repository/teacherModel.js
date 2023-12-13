const Teacher =require('../models/teacherModel')



class TeacherModel{
    async createTeacher(teacherData,certificate,teacherId) {
        try {
          let newTeacher = new Teacher({
            fullName:teacherData.fullName,
            email:teacherData.email,
            phoneNumber:teacherData.phoneNumber,
            password:teacherData.password,
            lastQualification:teacherData.lastQualification,
            bankAccountNo:teacherData. bankAccNumber,
            ifcCode:teacherData.ifcCode,
            idProof:teacherId.url,
            certificate:certificate.url,
            isTeacher:true,

          });
      
          await newTeacher.save();
      
          return newTeacher;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a student user');
        }
      }
      async getTeacherByEmail(teacherEmail) {
        try {
          const teacher = await Teacher.findOne({ email: teacherEmail });
          if (!teacher) {
            return null; // Return null when user is not found
          }
          return teacher;
        } catch (error) {
          throw new Error('Failed to get user by email');
        }
      }


      async  getTeacherByRequested() {
        try {
          const requestedTeachers = await Teacher.find({ isTeacher: true, isApproved: false }); 
          
          return requestedTeachers; 
        } catch (error) {
          console.error(error);
          throw new Error('Error fetching requested teachers');
        }

      }
      async teacherUpdateFeild(email,fieldName, fieldValue){
        try {
        
          const result = await Teacher.findOneAndUpdate(
            { email },
            { $set: { [fieldName]: fieldValue } },
            
          );

          console.log(result);
          return result;
        } catch (error) {
          
        }

      }

      async teacherDelete(email){
        try{
        const result =await Teacher.deleteOne({email})
        if (result.deletedCount === 1) {
          console.log('Document deleted successfully');
          return result
        } else {
          console.log('Document not found or not deleted');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      }
      async getAllTeachers(){
        const teachers = await Teacher.find()
        return teachers
      }

}

module.exports= TeacherModel