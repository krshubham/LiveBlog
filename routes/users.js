var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blog'

var posts = null;

//I made it by keeping in my mind that only I will use this thing. So Your db design can obviously
//differ form my db design.


mongo.connect(url,function(err,db){
	try{
		assert.equal(err,null);
		posts = db.collection('posts');
		console.log('I was able to get access to the collection containing all the posts');
	}
	catch(e){
		console.error('error connecting to the database');
	}

});


function PostTheBlog(req,res){
	var content = req.body.content;
	posts.insertOne({
		data: content,
		user: 'shubham',
		date: Date()
	},function(err,done){
		try{
			assert.equal(err,null);
			console.log('post inserted');	
			res.redirect('/blog');
		}
		catch(e){
			console.log(e);
		}
	});	
}


router.post('/post',PostTheBlog);

module.exports = router;
