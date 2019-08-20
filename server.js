const express = require("express");
const database = require("./db/database.js");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
let session = require('express-session');
const secret  = require("./secret");
const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');
const app = express();
//exporting app for socket
module.exports = {
  "app":app
}
const socket = require('./socket/socket');

//middleware
let auth = (req, res, next) => {
  if (req.session.Isloggedin) {
      next();
  } else {
      res.redirect("/");
  }
};

//setting thigs up
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("views", path.join(__dirname, "views"));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// setting upn routes
app.use("/",mainRoute);
app.use("/user",auth,userRoute);
// strting a server
