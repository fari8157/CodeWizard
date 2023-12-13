const fs = require("fs");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
const ffmpegPath = "C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe";
const {videoUpload}=require('./cloudinery/upload')





const uploadVideo = async (videoFile) => {
  try {
    const outputDirectory = "./compressed_videos";
    const compressedVideoPath = `${outputDirectory}/${Date.now()}_compressed.mp4`;

    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const ffmpegCommand = `${ffmpegPath} -i "${videoFile.tempFilePath}" -c:v libx265 -preset medium -crf 32 -c:a aac -strict -2 "${compressedVideoPath}"`;
    await execPromise(ffmpegCommand);

    const result = await videoUpload(compressedVideoPath)

    fs.unlinkSync(compressedVideoPath);

    return result
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports={
  uploadVideo
}