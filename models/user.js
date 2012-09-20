/*
 * Models for User
 */
var mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , util = require('util')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

// Define the schema
var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true }},
  email: { type: String, required: true, index: { unique: true }},
  hash: { type: String, required: true },
  posts: [{ type: ObjectId, ref: 'Post' }]
});

// Create the virtual attribute password
userSchema.virtual('password').set(function(password) {
  // User bcrypt to hash the password
  var salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

// Verify password method for this model
userSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.hash, callback);
});

// Static method to authenticate user
userSchema.static('authenticate', function(username, password, callback) {
  this.findOne({ username: username }, function(err, user) {
    // Log
    // If error return error
    if (err) {
      return callback(err);
    }
    // If no user return false
    if (!user) {
      return callback(null, false);
    }

    // Verify Password
    user.verifyPassword(password, function(err, isCorrect) {
      // If error
      if (err) {
        return callback(error);
      }
      // If not correct return false
      if (!isCorrect) {
        return callback(null, false);
      }

      console.log(util.inspect(user));
      return callback(null, user);
    });
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
