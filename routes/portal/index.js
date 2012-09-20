/*
 * Import route for portal part
 */
var passport = require('passport')
  , helpers = require('./helpers');

module.exports = function(app) {
  // Load controllers
  var homeCtrl = require('./home');
  var userCtrl = require('./user');

  //--- Route for home page
  app.get('/', homeCtrl.index);

  //--- Route for edit page content
  app.get('/partials/home', homeCtrl.content);

  //--- Route for user 
  // Route for list
  app.get('/user', helpers.ensureAuthenticated, userCtrl.index);

  // Route for register user
  app.get('/partials/register', [helpers.ensureNotAuthenticated, helpers.csrf], userCtrl.register);
  app.post('/register', [helpers.ensureNotAuthenticated, userCtrl.validate], userCtrl.register);

  // Route for login user
  app.get('/partials/login', helpers.csrf, userCtrl.login);
  app.post('/partials/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/partials/login'
  }));

  // Route for logout user
  app.get('/logout', helpers.ensureAuthenticated, userCtrl.logout);

  // Route for dashboard
  app.get('/partials/user/dashboard', userCtrl.dashboard);
  
  // Route for profile
  app.get('/partials/user/profile', userCtrl.profile);
  

  //----- HTML 5 history
  app.get('/users*', helpers.ensureAuthenticated, userCtrl.index);
  app.get('*', helpers.ensureNotAuthenticated, homeCtrl.index);
};
                        
