var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

mongoose.connect('mongodb://localhost/shortly');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connectionerror:'));
db.once('open', function() {
  console.log('we are connected');
});

module.exports = db;
