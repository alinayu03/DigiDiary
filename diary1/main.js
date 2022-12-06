import Experience from "./Experience/Experience";

const experience = new Experience(document.querySelector(".experience-canvas"));

var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

var app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


var db = new sqlite3.Database('./database/diary.db');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./')));
app.use(helmet());
app.use(limiter);

// db.run('CREATE TABLE IF NOT EXISTS entries(id INT, date DATETIME, title TEXT, entry TEXT, mood TEXT)');
db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

// Insert
app.post('/create', function(req,res){
    console.log("HERERER")
    db.serialize(()=>{
      db.run('INSERT INTO emp(id,date,title,entry,mood) VALUES(?,?,?,?,?)', [1, req.body.id, req.body.date, req.body.entries, req.body.mood], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.send("Successfully Added");
      });
  });
});

app.post('/entries.html', function(req,res){
db.serialize(()=>{
    db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.body.id], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
    if(err){
        res.send("Error encountered while displaying");
        return console.error(err.message);
    }
    res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
    console.log("Entry displayed successfully");
    });
});
});
// app.get('/', function(req,res){
//     res.sendFile(path.join(__dirname,'./index.html'));
// });

// app.post('/create', function(req,res){
//     db.serialize(()=>{
//         console.log(req.body)
//       db.run('INSERT INTO entries(id, date, title, text, mood) VALUES(?,?,?,?,?)', [req.body.id, req.body.name], function(err) {
//         if (err) {
//           return console.log(err.message);
//         }
//         console.log("New employee has been added");
//         res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
//       });
//   });
//   });