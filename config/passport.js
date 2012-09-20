var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models/user');

  // Define authentication strategy for Passport
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.authenticate(username, password, function(err, user) {
        console.log('Username: ' + username + ' Password: ' + password + '\n');
        done(err, user);
      });
    }
  ));

  // Serialize user on login
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize user on log out
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  module.export = {};
