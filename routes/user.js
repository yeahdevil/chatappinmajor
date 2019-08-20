const Router = require("express").Router();
const Modals = require("../db/modals");
let User = Modals.User;
let Chat = Modals.Chat;
let Group = Modals.Group;
let GroupChat = Modals.GroupChat;
Router.get("/",(req,res)=>{
res.redirect("/user/home");
})
Router.get("/home",(req,res)=>{
    res.redirect("newChat");
});
Router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
});
Router.get("/newChat",(req,res)=>{
    User.find((err,data)=>{
        if(!err){
            if(data){
                Group.find((err,fetched)=>{
                    if(!err){
                        if(fetched){
                            res.render("newChat",{users:data,session:req.session._id,groups:fetched});
                        }
                    }
                })

               
            }
        }
    })
   
});
Router.get("/newGroup",(req,res)=>{
    User.find((err,data)=>{
        if(!err){
            if(data){
                res.render("createGroup",{users:data,session:req.session._id});
            }
        }
    })
})
Router.get("/joinChat/:id",(req,res)=>{

    Chat.find({"roomID":{
        $eq:req.params.id
    }},null,(err,data)=>{
        if(!err){
            if(data){
                res.render("chatroom",{messages : data});
            }
        }
    })

})
Router.post("/newGroup",(req,res)=>{
    console.log(req.body.admin + req.body.groupName);
    Group.findOne({$and:[{"admin":{$eq:req.body.admin}},{"groupName":{$eq:req.body.groupName}}]},(err,fetched)=>{
        if(!err){
            if(!fetched){
                createGroup(req.body.admin,req.body.groupName,req.body.members);
                res.send("sucess");
            }
            else{
                console.log(fetched);
                res.send("fail");
            }
        }
    })
   
    
})

Router.get("/joinGroup/:id",(req,res)=>{
    var url = req.params.id;
    parts = url.split("."),
    admin = parts[parts.length-1];
    groupName = parts[0];
  
    Group.findOne({$and:[{"admin":{$eq:admin}},{"groupName":{$eq:groupName}}]},(err,fetched)=>{
        if(!err){
            
            if(fetched){ 
                let member=false;
               for(var i=0;i<=fetched.members.length;i++){
                   if(req.session._id==fetched.members[i]||req.session._id==fetched.admin)
                   {
                       member=true;
                       break;
                   }
               }
               if(!member){
                   res.send("you are not a prt of this group");
               }
               else {
                   GroupChat.find({roomID:url},(err,data)=>{
                       if(!err){
                           if(data){
                            res.render("groupChatRoom",{"messages":data,user:req.session.username});
                           }
                       }
                   })
                
               }
            }
        }
    })
})


function createGroup(admin,groupName,members){
   let group = new Group({
    "admin":admin,
    "groupName":groupName,
    "members":members
   }).save(); 
}
module.exports = Router;