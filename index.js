var express = require('express');
var expressHandlebars = require('express-Handlebars');
var bodyParser = require('body-Parser');
var Sequelize = require('sequelize');
var PORT = process.env.NODE_ENV || 8080;

var connection = new Sequelize ('test_validation_db','root');

var app = express();

app.engine('handlebars',expressHandlebars({
  defaultLayout : 'main'
}));

app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({
  extended:false
}));

var Note = connection.define('note',{
  Name : {
    type:Sequelize.STRING,
    allowNull: false
  },
  PhoneNumber :{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  Message : {
    type:Sequelize.TEXT,
    allowNull:true
  }
});

app.get('/',function(req,res){
  Note.findAll({}).then(function(results){
    res.render('index',{results});
  });
});

connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log('listening on port %s',PORT);
  });
});
