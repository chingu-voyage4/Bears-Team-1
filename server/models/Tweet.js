const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define Tweet Schema
const TweetSchema = new Schema({
  user: String,
  text: String,
  comments: [{
    user: string,
    text: String,
    time: Number
  }],
  likes: Number,
  retweets: 390,
  time: Number
});
// Convert Schema to Model
const Tweet = mongoose.model('tweet', TweetSchema);
// Export Model
module.exports = Tweet;