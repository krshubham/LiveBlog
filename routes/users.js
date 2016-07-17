var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blog'
mongo.connect(url,function(err,db){
	assert.equal(err,null);
	
});	
mongo.connect


function PostTheBlog(req,res){
	var content = req.body.content;

}



router.post('/post',PostTheBlog);



module.exports = router;
