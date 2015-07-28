var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');

var User = db.Model.extend({
  tableName: 'users',
  // hasTimestamps: true,
  defaults: {
    username: 'eliottttt',
    hashedpass: '12345'
  },
  users: function() {
    return this.hasMany(Link);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var that = model;
      console.log(model)
    // bcrypt.genSalt(10, function(error, result){
        that.set('salt', 'salted');
        that.set('hashedpass', 'hashed');
      bcrypt.hash(model.get('hashedpass'), null, null, function(error, hashed){
      // model.save();
      });
        // });
    });
  }
});

module.exports = User;

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });
 
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

//brush

