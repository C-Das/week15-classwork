var express = require ('express');
var app = express();
var PORT = process.env.NODE_ENV || 8080;
var expressHanldlebars = require ('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({extended:false}));

app.engine('handlebars',expressHanldlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.static('public'));

var connection = mysql.createConnection({
  PORT : 3306,
  host :'localhost',
  user :'root',
  database : 'burger_db'
});

connection.connect(function(err){
  if(err){
    throw err;
  }
});
app.listen(PORT,function(){
  console.log("Application is running on PORT %s", PORT);
});