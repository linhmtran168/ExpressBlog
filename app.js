
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
  , RedisStore = require('connect-redis')(express)
  , passport = require('passport')
  , validator = require('express-validator');

var app = express();

app.configure(function(){
  // Generic config
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view option', {
    layout: false
  });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(validator);
  app.use(express.methodOverride());

  // Session configuration
  app.use(express.cookieParser());
  app.use(express.session({
    store: new RedisStore({ db: 'sessions', maxAge: 7200000 }),
    secret: 'SuperLinh123456789'
  }));

  // Passport initialization 
  app.use(passport.initialize());
  app.use(passport.session());

  // CSRF configuration
  app.use('/partials*', express.csrf());

  // Authentication configuration
  app.use(function(req, res, next) {
    // Set the local user = req.user;
    res.locals.currentUser = req.user;
    // Log
    console.log(req.user);

    next();
  });


  // Static assets
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  // Router configuration
  app.use(app.router);
});

// Env specific config
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://localhost:27017/expressBlog');
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

// Require passport config
require('./config/passport');

// Add routes to express app
require('./routes')(app);

// Create the server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
