/*console.log("Hello World"); */


/*
 

const flatten=require('array-flatten');
var myArr= [
    ["hello", "world"],
    ["good","bye"]

];

*/
/* run it using node index.js*/

/*
//create server object:
const http= require('http');

const server= http.createServer(function (req, res) {
    res.write('Hello World!');
    res.end();
});
server.listen(8080);
console.log("Listensing on http://localhost:8080");
*/



/*
//Express routing example
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(8080);
*/


/*
//one more example

//Express routing example
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage

app.get('/hello', function (req, res) {
  res.send(' world') //when we listen and open the link http://localhost:8080/hello we can see the message world
})

app.get('/goodbye', function (req, res) {
    res.send('new paltz')//when we listen and open the link http://localhost:8080/goodbye we can see the message new paltz
  })

app.listen(8080);
*/




/*
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.use(function(req, res, next){
    res.write('This is testing use method');
    next(); //demonstrates use method
});
app.get('/hello', function (req, res) {
  res.write(' world') //when we listen and open the link http://localhost:8080/hello we can see the message world
  res.end();
});

app.get('/goodbye', function (req, res) {
    res.write('new paltz')//when we listen and open the link http://localhost:8080/goodbye we can see the message new paltz
    res.end();
  });

app.listen(8080);
*/


/*
var express = require('Express');
var app = express();

var things = require('./things.js');

//both index.js and things.js should be in same directory
app.use('/things', things);

app.listen(8080);

*/

//Dynamic routes
var express= require('express');
var app= express();

app.get('/:id', function(req,res){
	res.send('the id requested is :' + req.params.id);
});

app.listen(8080);