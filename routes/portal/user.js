var User = require('../../models/user')
  , util = require('util');
/*
 * Route for user 
 */
module.exports = {

  // Function to show the users list
  index: function(req, res) {
    res.render('user/index', { 
      title: 'User',
      module: 'user',
    });
  },

  // Function to show the dashboard
  dashboard: function(req, res) {
    res.render('user/dashboard', {
      title: 'Dashboard',
    });
  },

  // Function to show the profile
  profile: function(req, res) {
    res.render('user/profile', {
      title: 'profile',
    });
  },

  // Function to login user
  login: function(req, res) {
    res.render('user/login', { title: 'Login' });
  },

  // Function to log out
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  // Function to register user
  register: function(req, res) {
    if (req.method !== 'POST') {
      res.render('user/register', { 
        title: 'Register',
      });
    } else {
      // Create the user instance
      var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      // Save the user
      user.save(function(err) {
        if (err) {
          console.log('Error:\n' + util.inspect(err.errors));
          res.redirect('/register');
        } else {
          console.log("Save user successfully");
          res.redirect('/users');
        }
      });
    }
  },

  // Function to validate user
  validate: function(req, res, next) {
    // Create rule for validate user instance
    req.check('username', 'Invalid Username').notEmpty().is(/^[a-zA-Z0-9_]+$/);
    req.check('email', 'Invalid Email').notEmpty().isEmail();
    req.check('password', 'Password must not be empty').notEmpty();
    req.check('passwordConfirm', 'Password and password confirmation must be the same').notEmpty().equals(req.body.password);

    // Create the mapped errors array
    var errors = req.validationErrors(true);

    // If there is error redirect
    if (errors) {
      console.log("Error: " + util.inspect(errors)); 
      res.redirect('/register');
    } else {
      next();
    }
  },
};
