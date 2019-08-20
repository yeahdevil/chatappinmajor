var app = require('../server').app;
var socket = require('socket.io');
const Chat = require("../db/modals").Chat;
const GroupChat = require("../db/modals").GroupChat;
var server = app.listen(4000,(err)=>{
    if(err) throw err;
    else console.log("lsitening to 4000");
  })

  var io =  socket(server);
io.on("connection",(socket)=>{

//connect to socket
  console.log("connected to socket");
//joining room
socket.on("connectRoom",(data)=>{

     socket.join(data); 
})
socket.on("message",(data)=>{
  newMessageInDB(data.msg,data.roomUsers)
  io.sockets.in(data.roomUsers).emit('message', data.msg);
})
socket.on("connectGroupRoom",(data)=>{
  socket.join(data); 
})
socket.on("groupMessage",(data)=>{
 
 console.log(data)
 newGroupMessageInDB(data.msg,data.roomUsers,data.sender)
 io.sockets.in(data.roomUsers).emit('groupMessage', {"msg":data.msg,"sender":data.sender});
})

})

function newMessageInDB(msg,roomID){
  var msg = new Chat({
    roomID: roomID,
    message:msg
  }).save();

}
function newGroupMessageInDB(msg,roomID,sndr){
  var msg = new GroupChat({
    roomID: roomID,
    message:msg,
    sender:sndr
  }).save();

}

 