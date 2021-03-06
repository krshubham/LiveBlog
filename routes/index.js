var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/blog';

var posts = null;
var users = null;

/* GET home page. */
router.get('/', ShowBlog);


//Original version of the ShowBlog function
function ShowBlog(req,res){
	mongo.connect(url,function(err,db){
		try{
			assert.equal(err,null);
			posts = db.collection('posts');
			users = db.collection('users');
			var BlogPosts = posts.find();
			//console.log(BlogPosts);
			//console.log('Db connection for posts done');
			var arr = [];
			BlogPosts.each(function(err,doc){
				try{
					assert.equal(err,null);
					if(doc!=null){
						arr.unshift(doc);
					}
				}
				catch(e){
					console.log('Error in line 32: index.js' + e);
				}
			});
			var vm =  {
				title: 'Kumar Shubham',
				posts: arr
			};
			res.render('blog',vm);
		}
		catch(e){
			console.log('Some error occured in index.js');
		}
	});
}


function MakeSampleUser(req,res){
	var name = "krshubham",
	password = "shubhi";
	users.insertOne({
		name: name,
		password: password
	},function(err,done){
		try{
			assert.equal(err,null);
			res.json({
				success: true,
				message: "success in creating the user"
			});	
		}
		catch(err){
			res.status(500).send({
				success: false,
				message: "Sample user was not created"
			});
		}
	});
}

router.get('/admin',function(req,res,next){
	res.render('index',{
		title: 'admin'
	});
});
router.get('/setup',MakeSampleUser);
module.exports = router;
