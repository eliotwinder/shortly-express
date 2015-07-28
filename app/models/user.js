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
      return bcrypt.hashAsync(model.get('hashedpass'), 0, null) 
        .then( function(hash) {
          console.log(hash, "here22?");
          model.set('hashedpass', hash);
        }).catch(function(error) {
          console.log(error, "here25?");
        });
    });
  },
   
  compare: function(password) {
    var hashedpass = this.get('hashedpass');
    console.log('hashedpass = ', hashedpass, 'password = ', password);
    bcrypt.compareAsync(password, hashedpass)
      .then(function(result){

        console.log(result, "<< the result");
        console.log('compare got to here, line 34');
      });
  }
});

// Load hash from your password DB.
// bcrypt.compare('B4c0/\/', hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare('not_bacon', hash, function(err, res) {
//     // res == false
// });

module.exports = User;


