const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();



const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "sena",
    database:"login"
});

//connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("Connection to database successfull!")
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
});

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("SELECT * FROM loginuser WHERE user_name = ? AND user_pass = ?",
     [username,password],function(error,results,fields){
        if (results.lenght > 0){
            res.redirect("/index");
        }else{
            res.redirect("/");
        }
        res.end();
    });
});

//when login is successfull
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

//set app port
app.listen(5551);




