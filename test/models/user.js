var mongoose = require('mongoose')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , User = require("../../models/user");

mongoose.connect('mongodb://localhost:27017/expressBlogTest');

describe("User", function() {
  var testUser = null;

  beforeEach(function(done) {
    // Add test data
    testUser = new User({
      username: "testUser1",
      email: "linhmtran168@live.com",
      password: "Dragon"
    });

    testUser.save(function(err, user) {
      if (!err) {
        done();
      }
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });

  it("Save a new user", function(done) {
    var testUser2 = new User({
      username: "testUser2",
      email: "dragon1@live.com",
      password: "abcxyz",
    });

    testUser2.save(function(err, user) {
      user.username.should.equal('testUser2');
      user.hash.should.not.equal('abcxyz');
      done();
    });
  });

  it("Authenticate a user", function(done) {
    User.authenticate("testUser1", 'Dragon', function(err, user) {
      user.email.should.equal("linhmtran168@live.com");
      done();
    });
  });
}); 
