var express= require("express");
var app=express();
var router= express.Router();
var path= __dirname + '/HTML Views/';

router.use(function(req,res,next){
    console.log("/" + req.method);
    next();
});

router.get("/", function(req,res){
    res.sendFile(path + "index.html");
});

router.get("/category", function(req, res){
res.sendFile(path + "category.html");
});

router.get("/share", function(req, res){
    res.sendFile(path + "share.html");
});

app.use("/", router);

app.use('*', function(req,res){
    res.sendFile(path + "404.html");
});

app.listen(8080,function(){
    console.log("Live at port 8080");
});


