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
// Export Model
module.exports = mongoose.model("Tweet", TweetSchema);
