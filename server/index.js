//libraries
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const execFile = require('child_process').execFile;
const fs = require("fs");

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
        console.log('taking request...');
        console.log(req.query);
        console.log(res.query);
        if(typeof req.query !== 'undefined' && typeof req.query.type !== 'undefined')
            console.log("type: "+req.query.type);
        else if(typeof req.query === 'undefined') req.query = {type:''};
        else req.query.type = '';

        // mock GET request environment variables for script to pick up (with CGI)
        process.env['QUERY_STRING'] = 'type='+req.query.type;
        process.env['REQUEST_METHOD'] = 'GET';

        const child = execFile('perl', ['server/content.cgi'], (error, stdout, stderr) => {
            // hopefully the response object is still alive.
            if (error){
                console.log(error.message);
            }
            res.send(stdout);
        });
    })
    // .use("/", (req, res, next) => {
    //     //just return from file in parent folder
    //     res.send(fs.readFileSync(process.cwd()+req.path));
    // })
    .listen(port);

//remind the developer of our url
console.log("running on http://" + serverName + ":" + port);