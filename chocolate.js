var express = require('express');
var Sequelize = require('sequelize');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var PORT = process.env.NODE_ENV || 8080;

var app = express();

app.engine('handlebars',expressHandlebars({
  defaultLayout :'main'
}));

app.set('view engine','handlebars');

var connection = new Sequelize ('chocolates_db','root');

app.use(bodyParser.urlencoded({
  extended :false
}));

var Chocolates = connection.define ('chocolate',{
  chocolates : {
    type : Sequelize.STRING,
    unique : true,
    allowNull: false,
  },
  satisfaction_level: {
    type:Sequelize.INTEGER,
    unique:false,
    allowNull:false,
  },
});

// Chocolates.bulkCreate([
//   {chocolates:"Dark chocolate",satisfaction_level:8 },
//   {chocolates:"Couverture",satisfaction_level:5 },
//   {chocolates:"Milk chocolate",satisfaction_level:8 },
//   {chocolates:"Hershey",satisfaction_level:7 }
// ]);

app.get('/',function(req,res){
  Chocolates.findAll({}).then(function(results){
    res.render('chocolates',{results});
  });
});

connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Application is listening on PORT %s",PORT);
  });
});
