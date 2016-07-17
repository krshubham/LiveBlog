var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/blog';

var posts = null;
mongo.connect(url,function(err,db){
	try{
		assert.equal(err,null);
		posts = db.collection('posts');
	}
	catch(e){
		console.log('Some error occured in index.js');
	}
});


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Welcome' });
});


function ShowBlog(req,res){
	var BlogPosts = posts.find();
	var arr = []
	BlogPosts.each(function(err,doc){
		try{
			assert.equal(err,null);
			arr.push(doc);
		}
		catch(e){
			console.log('Error in line 32: index.js' + e);
		}
	});
	arr.reverse();
	console.log(arr);
	var vm =  {
		data : arr
	};
	res.render('blog',vm);
}


router.get('/blog',ShowBlog);
module.exports = router;
