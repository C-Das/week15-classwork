var express = require('express');
var Sequelize = require('sequelize');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var PORT = process.env.NODE_ENV || 3000;

var app = express();

app.engine('handlebars',expressHandlebars({
  defaultLayout :'main'
}));

app.set('view engine','handlebars');

var connection = new Sequelize ('user_authentication_db','root');

app.use(bodyParser.urlencoded({
  extended :false
}));

app.get('/',function(req,res){
  res.send("Home Page !!");
})

connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Application is listening on PORT %s",PORT);
  });
});
