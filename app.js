//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const requst = require("request");

const app = express();
var dic = {
  "yeswanth@gmail.com":1234,
  "nagi@gmail.com":12345
}

function save(mail, password){
  dic[mail]= password;
}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/main.html");
});

app.post("/", function(req, res){



  var email = req.body.email;
  var password = req.body.password;


if (email in dic){

  if (dic[email] == password){
    res.sendFile(__dirname + "/inside.html");
  } else{
    console.log("Incorrect Password");
  }
} else {
  console.log("Email not found");
}
});

app.get("/signin", function(req, res){
   res.sendFile(__dirname + "/signin.html");
});

app.post("/signin", function(req, res){
   var mail = req.body.mail;
   var password1 = req.body.password1;
   var password2 = req.body.password2;



  if (password1 == password2){
    save(mail, password1);
    console.log(dic);
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
