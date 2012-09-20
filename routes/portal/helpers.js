/*
 * Helpers for portal route
 */
// Middleware to ensure an user is authenticated
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { 
    return next();
  }

  res.redirect('/login');
};

// Middleware to ensure an user is not authenticated
exports.ensureNotAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user');
  }

  next();
};

// Middleware to create a csrf token to use with request
exports.csrf = function(req, res, next) {
  // Set the local token variable
  res.locals.token = req.session._csrf;

  next();
};
