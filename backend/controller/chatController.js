const chatModel = require("../models/chatModel");
const messageModel = require("../models/messageModel");
const Teacher=require('../models/teacherModel')
const User=require('../models/userModels')
const Course=require('../models/courseModel')
const jwt= require( "jsonwebtoken");
const crypto=require('crypto')


function generateUniqueRoomId(senderId, recieverId) {
  try{
    const sortedIds = [senderId, recieverId].sort();
    const combineIds = sortedIds.join("");
    const roomId = crypto.createHash("sha1").update(combineIds).digest("hex");
    return roomId;
  }catch (error) {
    throw error; 
  }}
  
  
  const sendMessage = async (data) => {
    try {
      const { textMessage, conversationId, recipientId, token, role } = data;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const existingChat = await chatModel.findOne({conversationId});
      if(existingChat){
        const newMessage = new messageModel({
          sender: {type: role === 'teacher' ? 'Teacher' : 'User', refId: decodedToken.id},
          content: textMessage,
          chat: existingChat._id
        })
        const message = await newMessage.save()
        existingChat.latestMessage = message._id;
        await existingChat.save()
        return;
      }
  
      const newChat = new chatModel({
        conversationId,
        participants: [decodedToken.id, recipientId],
      })
  
      const createdChat = await newChat.save();
  
      const newMessage = new messageModel({
        sender: {type: role === 'teacher' ? 'Teacher' : 'User', refId: decodedToken.id},
        content: textMessage,
        chat: createdChat._id
      })
  
      const message = await newMessage.save()
      createdChat.latestMessage = message._id;
      await createdChat.save()
      
    } catch (error) {
      console.log(error);
    }
  };

  const allMessages = async (req, res) => {
    try {
      const recipientId = req.params.id;
      const userId = req.user.id;
      let conversationId = generateUniqueRoomId(userId, recipientId);
      console.log(conversationId);
  
      const existingChat = await chatModel.findOne({conversationId})
  
      if(!existingChat){
        return res.status(200).json({conversationId})
      }
  
      const messages = await messageModel
        .find({ chat: existingChat._id })
        .populate("sender", "fullName email");
  
      res.status(200).json({existingChat, messages, conversationId});
    } catch (error) {}
  };

  const getAllTeachers = async (req, res) => {
    try {
       

      const teacherIds = await Course.distinct("teacher_id", { users: req.user.id });
  
      let teachers = [];
      console.log("Teacher IDs:", teacherIds);
  
      for (const id of teacherIds) {
        const teacher = await Teacher.findById(id).select("fullName email pic");
        teachers.push(teacher);
    }
    console.log( teachers);
  
      res.status(200).json({ teachers });
    } catch (error) {
      console.log(error);
    }
  };
  
  const listChatStudents = async (req, res) => {
    try {
      const teacherId = req.user.id;
      const chats = await chatModel.find({ participants: teacherId });
       const uniqueStudentIds = new Set();
  
      for (const chat of chats) {
        const userId = chat.participants.find((id) => !id.equals(teacherId));
           uniqueStudentIds.add(userId);
      }
       const uniqueStudentIdsArray = Array.from(uniqueStudentIds);
       const students = await User.find({ _id: { $in: uniqueStudentIdsArray } });
  
      res.status(200).json({ students });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


  module.exports={
    sendMessage,
    allMessages ,
    getAllTeachers,
    listChatStudents,
  }