const express = require("express");
const router = express.Router();
const Tweet = require("./models/Tweet");
const User = require("./models/User");

// Like a tweet
router.post("/like/userId=:user_id&tweetId=:tweet_id", (req, res) => {
  let tweet_id = req.params.tweet_id;
  let user_id = req.params.user_id;

  User.findById({ _id: user_id })
    .then(user => {
      user.push({ likes: tweet_id }).then(result => res.send(result));
    })
    .catch(err => res.send(err));
});

module.exports = router;
