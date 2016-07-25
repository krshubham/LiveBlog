var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/blog';
var secret = 'g@@k';
var jwt = require('jsonwebtoken');

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
		process.exit(0);
	}
}
//Connecting to the database:
mongo.connect(url,dbConnect);

function handleLogin(req,res,next){
	var name = req.body.name;
	var password = req.body.password;
	users.findOne({name: name}).then(function(item){
		try{
			assert.notEqual(item,null);
			if(item.password !== password){
				console.log('wrong password');
				res.redirect('/');
			}
			else{
				console.log('The user verified');
				var token = jwt.sign(item, secret, {
					expiresIn: 6000 // expires in 10 minutes
				});
				var vm = {
					title: 'Create',
					token: token
				};
				res.render('createBlog',vm);
				//res.redirect('/users/create');
			}
		}
		catch(e){
			console.log('There is an error ');
			console.log(e);
			res.redirect('/');
		}
	});
}
router.post('/login',handleLogin);


module.exports = router;