const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3")
const fs = require('fs')

const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    },
})

const bucketName = process.env.S3_BUCKET_NAME


const S3_uploadVideo = async (file) =>{
    
    
    try {
        const fileContent  = fs.readFileSync(file.tempFilePath)
        console.log(fileContent);

        const params = {
            Bucket: bucketName,
            Key: file.name,
            Body: fileContent,
            ContentType: file.mimetype,
        }

        const uploadParallel = new Upload({
            client: s3,
            queueSize: 4,
            partSize: 5542880,
            leavePartsOnError: false,
            params,
        })

        uploadParallel.on("httpUploadProgress", progress => {
			console.log(progress)
		})

        const data = await uploadParallel.done()
        return {
            public_id: data.Key,
            url: data.Location
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
   S3_uploadVideo,
}