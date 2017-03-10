var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

var User = mongoose.model('User', userSchema);

User.comparePassword = function(attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.pre('save', function(next) {
  var user = this;
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(user.password, null, null)
      .then(function(hash) {
        user.password = hash;
        next();
      });
});

module.exports = User;