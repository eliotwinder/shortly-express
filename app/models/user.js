var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var User = db.Model.extend({
  tableName: 'users',
  // hasTimestamps: true,
  defaults: {
    username: 'Joe',
    hashedpass: '12345'
  },
  users: function() {
    return this.hasMany(Link);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      console.log('reached line 18');
      
      bcrypt.genSalt(10, function(error, salt){
        console.log('reached line 20');
        bcrypt.hash('12345', salt, null, function(error, hashed){
          console.log('line 23', salt, hashed);
        });

      });
      // model.set('hashedpass', 'working');

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

