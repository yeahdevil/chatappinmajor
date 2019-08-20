const Router = require("express").Router();
const database = require("../db/database");
const Modals = require("../db/modals");
const notie = require("notie");
let User = Modals.User;


Router.get("/",(req,res)=>{
    res.render("home");
});
Router.get("/signup",(req,res)=>{
    res.render("signup");
});

Router.get("/error",(req,res)=>{
    res.render("error",{abc:"not connected  "});
});
Router.get("/login",(req,res)=>{
    res.render("login");
});
Router.post("/login",(req,res)=>{
    User.findOne({
        username: {
            $eq: req.body.username
        },
        password:{
            $eq:req.body.password
        }
    },(err,fetched)=>{
        if(err) throw err;
        else{
            if(!fetched){
               res.send("notfound")
            }
            else{
                
                req.session.username=req.body.username;
                req.session.Isloggedin = true;
                req.session._id = fetched._id;
                //console.log(req.session);
                
                res.send("success");
            }
        }
    });
})
Router.post("/signup",(req,res)=>{
    var username = req.body.username;
    User.findOne({
        username: {
            $eq: username
        }
    }, (err, fetched) => {
        if (fetched) {
            res.send("found");
        } else {
             new User({
                username: username,
                password: req.body.password,
            }).save((err) => {
                if (err)
                    throw err;
                    else
                    res.send("created");
            });
        }
    });
});



module.exports = Router;