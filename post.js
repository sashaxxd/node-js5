var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';

module.exports = {
    addPost: function(title, subject, callback){
        MongoClient.connect(url,  { useNewUrlParser:true } , function(err, client) {
            var testdb = client.db('Blog');
            testdb.collection('post').insertOne( {
                "title": title,
                "subject": subject
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the blog post details.");
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
            });
        });
    },
    getPost: function(callback){

        MongoClient.connect(url,  { useNewUrlParser:true } , function(err, client){
            var testdb = client.db('Blog');
            testdb.collection('post', function (err, collection) {
                collection.find().toArray(function (err, list) {
                    callback(list);
                });
            });
        })
    }
}
