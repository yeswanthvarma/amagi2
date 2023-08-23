//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const requst = require("request");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/details", {useNewUrlParser: true});
const detailSchema = new mongoose.Schema({
  mail: String ,
  password1: String,
  password2: String
});

const Detail = mongoose.model("Detail", detailSchema);

// const detail1 = new Detail ({
//   mail:"yeswanth@gmail.com",
//   password1: "1234",
//   password2: "1234"
// });
//
// const detail2 = new Detail ({
//   mail:"nagi@gmail.com",
//   password1: "12345",
//   password2: "12345"
// });
//
// data = [detail1, detail2]
//
// Detail.insertMany(data).then(function(){
//     console.log("succ");
//   }).catch(function(err){
//     console.log(err)
// });

// detail.save();




app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/main.html");
});

app.post("/", function(req, res){



  var db, dbmail, dbpassword;
  var email = req.body.email;
  var password = req.body.password;
  Detail.findOne({mail: String(email) })
   .then((docs)=>{
     db=docs;
     console.log(dbmail = db.mail);
     dbpassword = db.password1;
     console.log(dbmail);
     console.log(dbpassword);
     console.log("Result :",db);



  if (String(email) == String(dbmail)){

    if (String(dbpassword) == String(password)){
      res.sendFile(__dirname + "/inside.html");
    } else{
      console.log("Incorrect Password");
    }
  } else {
    console.log("email not found");
  }
 }).catch((err)=>{
       console.log(err);
   });
   });


app.get("/signin", function(req, res){
   res.sendFile(__dirname + "/signin.html");
});

app.post("/signin", function(req, res){

  var mail = req.body.mail;
  var password1 = req.body.password1;
  var password2 = req.body.password2;

  const de = new Detail ({
    mail:String(mail),
    password1: String(password1),
    password2: String(password2)
  });

  if (password1 == password2){
    Detail.create(de).then(function(){
        console.log("succ sign up");

      }).catch(function(err){
        console.log(err)
    });

    res.sendFile(__dirname + "/main.html");

  } else{
    console.log( " Password mismatch");
  }
});




app.listen(3000, function() {
  console.log("server is running on port 3000");
});

// bf104399b49af489b98862c3896b9f53-us21
// a981b7d947
