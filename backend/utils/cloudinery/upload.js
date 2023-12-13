require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const { randomUUID } = require('crypto');



const imageUpload = async (file) => {
    console.log(file);
    try {
        if (!file || !file.mimetype.startsWith('image/')) {
            throw new Error('Invalid file type. Only images are allowed.');
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            public_id: `${randomUUID()}`,
            resource_type: "auto",
            folder: "CODEWIZARD",
           
        });

        const myResultObj = {
            public_id: result.public_id,
            url: result.url,
        };
        
        return myResultObj;
    } catch (err) {
        console.log(err);
    }
};

const videoUpload = async (file) => {
    console.log(file);
    console.log('hi');
    try {
      
  
      const result = await cloudinary.uploader.upload(file, {
        public_id: `${randomUUID()}`,
        resource_type: "video",
        folder: "CODEWIZARD_VIDEOS", 
        
      });
  
      const myResultObj = {
        public_id: result.public_id,
        url: result.url,
      };
  
      return myResultObj;
    } catch (err) {
      console.log(err);
      throw err; 
    }
  };
  


module.exports={imageUpload,videoUpload}