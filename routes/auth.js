var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/blog';

//function to handle the the database connection
var users = null;
function dbConnect(err,db){
	try{
		assert.equal(err,null);
		users = db.collection('users');
		console.log('connected to the db');
	}
	catch(e){
		console.log('Unable to connect to the database');
		//process.exit(0);
	}
}
//Connecting to the database:
mongo.connect(url,dbConnect);


//Display the Login Page
router.get('/login', function(req, res) {
  var vm = {
  	title: 'Login'
  };
  res.render('login',vm);
});

//function for handling the checking of records for the users in the database.
function findUser(err,item){
	try{
		assert.equal(err,null);
		if(item){
			console.log(item);
		}
		else{
			console.log('no user is there');
		}
	}
	catch(e){
		console.log('error occured while finding the user');
	}
}	




function handleLogin(req,res){
	//console.log('I receieved a request');
	var name = req.body.name,
		password = req.body.password;
	users.findOne({
		name: name,
		password: password
	},findUser);
}

router.post('/login',handleLogin);


module.exports = router;
