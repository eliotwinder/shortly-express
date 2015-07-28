var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');

Promise.promisifyAll(bcrypt);

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
      return bcrypt.hashAsync(model.get('hashedpass'), null, null)
        .then( function(hash) {
          console.log(hash);
          model.set('hashedpass', hash);
        }).catch(function(error) {
          console.log(error);
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

