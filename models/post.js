/*
 * Model for Post
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var postSchema = new Schema({
  _author: { type: ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  body: { type: String, required: true }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
