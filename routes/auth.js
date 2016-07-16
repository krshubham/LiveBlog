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


function handleLogin(req,res){
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
					expiresIn: 86400 // expires in 24 hours
				});
				var vm = {
					title: 'Blog',
					token: token
				}
				res.redirect('/users');				
			}
		}
		catch(e){
			console.log(e);
		}
	});
}
router.post('/login',handleLogin);

router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, secret, function(err, decoded) {			
			if (err) {
				var vm = {
					success: false,
					title: Welcome
				};
				return res.render('/',vm);		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
				console.log(req.decoded);
				return res.redirect('/users');
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

module.exports = router;
