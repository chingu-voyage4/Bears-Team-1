const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define Tweet Schema
const TweetSchema = new Schema({
  text: String,
  author: String
})
// Convert Schema to Model
const Tweet = mongoose.model('tweet', TweetSchema);
// Export Model
module.exports = Tweet;