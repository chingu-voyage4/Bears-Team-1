const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define Tweet Schema
const TweetSchema = new Schema({
  user: String,
  text: String,
  comments: [
    {
      user: String,
      text: String,
      time: Number
    }
  ],
  likes: Number,
  retweets: Number,
  time: Number
});
// Convert Schema to Model
const Tweet = mongoose.model("tweet", TweetSchema);
// Export Model
module.exports = Tweet;
