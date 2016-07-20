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
	console.log(req.connection.remoteAddress)
});


//Original version of the ShowBlog function
function ShowBlog(req,res){
	var BlogPosts = posts.find();
	var arr = [];
	BlogPosts.each(function(err,doc){
		try{
			assert.equal(err,null);
			if(doc !== null){
				arr.unshift(doc);
			}
		}
		catch(e){
			console.log('Error in line 32: index.js' + e);
		}
	});
	var vm =  {
		title: 'Kumar Shubham',
		posts : arr
	};
	console.log(arr);
	res.render('blog',vm);
}

router.get('/blog',ShowBlog);
module.exports = router;
