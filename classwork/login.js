var express = require('express');
var expressHandlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var PORT = process.env.NODE_ENV || 8080;
var bodyParser = require('body-parser');

var app = express();
var connection = new Sequelize ('test_validation_db','root');

app.engine('handlebars',expressHandlebars({
  defaultLayout :'main'
}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({
  extended :false
}));

var Login = connection.define ('login',{
  name : {
    type : Sequelize.STRING,
    unique : true,
    allowNull: false,
    validation : {
      check :function(bodyVal){
        if(!isAlpha(bodyVal)){
          res.send("Name should only be letters!!!");
        }
      },
      notEmpty:true,
      len:{
        ars:[1,50],
        msg:'Name should be between 1-50 characters, Can not be empty!!'
      }
    }
  },
  phonenumber: {
    type:Sequelize.INTEGER,
    unique:true,
    allowNull:false,
    validation: {
      check : function(bodyVal){
        if(!isNumeric(bodyVal)){
          res.send("The phone number should be numeric!!");
        }
      }
    }
  },
  message : {
    type : Sequelize.STRING,
    unique : true,
    validation : {
      notEmpty:true,
      len:{
        ars:[5,5000],
        msg:'Name should be between 5-500 characters!'
      }
    }
  },
});

app.get('/',function(req,res){
  Login.findAll({}).then (function(results) {
    res.render('login',{results});
  });
});

app.post('/entry',function(req,res){
  var myName = req.body.name;
  var myPhone = req.body.phone;
  var myMessage = req.body.message;

  Login.create({
    name :myName,
    phonenumber:myPhone,
    message:myMessage
    }).then(function(results){
      res.redirect('/?msg=Success');
    }).catch(function(err){
      debugger;
      console.log(err.errors[0].message);
      res.redirect('/?msg='+err.error[0].message);
    });
 });

connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Application is listening on PORT %s",PORT);
  });
});
