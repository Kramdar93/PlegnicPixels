//libraries
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const execFile = require('child_process').execFile;

//library instantiations
const app = express();

//load routing controller from simpleController.js
//const simple = require("./simpleController");
//const simple = require("./mvcRouter");
//const controller = require("./content/controller");

//define server name and port
const serverName = "localhost";
const port = 8080;


//use routing controller to listen on port
app
    //third-party middleware
    .use(bodyParser.json())
    .use(bodyParser.urlencoded( {extended:false} ))
    .use("/",(req,res,next)=>{
        //custom middleware to allow passing more data
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods","*");
        res.header("Access-Control-Allow-Headers","*");
        next();
    })
    .use("/", (req, res, next) => { //any path just call cgi
        //make cgi process for running a perl script.
        const child = execFile('perl', ['server/content.cgi',req.query.type], (error, stdout, stderr) => {
            // hopefully the response object is still alive.
            if (error){
                console.log(error.message);
            }
            res.send(stdout);
          });
    })
    .listen(port);

//remind the developer of our url
console.log("running on http://" + serverName + ":" + port);