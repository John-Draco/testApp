var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);

var app = express();



/*
var logger = function(req, res, next){
  console.log('Logging....');
  next();
}

app.use(logger);

*/


//View Engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var testApp = "this is a test change";


//set Static path for things like server, css files, angular app, etc
//app.use(express.static(path.join(__dirname, "public")));



app.get('/', function(req, res){
  db.users.find(function(err, docs){
    console.log(docs);
    
    res.render('index', {
    title: 'Customers',
    users: docs
  }
);
    
  })
  
  
})


app.post('/users/add', function(req, res){

      
  var newUser = {
    
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email    
  
  }

 db.users.insert(newUser, function(err, result){
    if(err){
      console.log(err)
      
    }else{
      res.redirect('/');
    }

  
  });
  
  
  
});



app.listen(3000, function(){
  console.log("we are listening on port 3000.... fuck yeah");
});