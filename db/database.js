const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/chatapp", {
  useNewUrlParser: true
});

let db = mongoose.connection;
db.on('open', () => {
  console.log("Connectes sucessfully to db");
});

db.on("error", (err)=> {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});


