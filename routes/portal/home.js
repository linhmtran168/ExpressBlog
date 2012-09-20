/*
 * Route for home
 */
module.exports = {

  // Function to show the home page
  index: function(req, res) {
    res.render('home/index', { 
      title: 'Express Blog',
      module: 'nonUser'
    });
  },

  // Function to show partial home content
  content: function(req, res) {
    res.render('home/content', { title: 'Express Blog' });
  }
};
