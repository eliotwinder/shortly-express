var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  defaults: {
    username: 'eliot',
    hashedpass: '12345'
  },
  users: function() {
    return this.hasMany(Link);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
        bcrypt.genSalt(10, function(error, result){
          bcrypt.hash(model.get('hashedpass'), result, null, function(error, hashed){
            model.set('hashedpass', hashed);
          });
        });
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

