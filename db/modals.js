const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
  
  });

  const chatSchema = new mongoose.Schema({
      roomID:{
        type:String,
        required:true
      },
    message:{
        type:String,
        
    }
  })

  const groupSchema = new mongoose.Schema({
    admin:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    members:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    groupName:{
      type:String,
      required:true
    }
  })

  const groupChatSchema = new mongoose.Schema({
    roomID:{
      type:String,
      required:true
    },
  message:{
      type:String,
      required:true
  },
  sender:{
    type:String,
    required:true
  }
  }) 


  const Group = mongoose.model("group",groupSchema);  
  const GroupChat = mongoose.model("groupchat",groupChatSchema);  
  const User = mongoose.model("user",userSchema);
  const Chat = mongoose.model("chat",chatSchema);
  module.exports = {
      User:User,
      Chat : Chat,
      Group:Group,
      GroupChat:GroupChat
  }