
/*
 * Route module for including portal and api route
 */

module.exports = function(app) {
  require('./portal')(app);
};
