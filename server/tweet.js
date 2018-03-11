const express = require("express");
const router = express.Router();
const Tweet = require("./models/Tweet");

// Get all tweets
router.get("/all", (req, res) => {
  Tweet.find().then(tweets => {
    res.send(tweets);
  });
});

// Find all tweets by user_id
router.get("/:user_id", (req, res) => {
  let creator = req.params.user_id;
  Tweet.find({ creator }).then(docs => {
    res.send(docs);
  });
});

// Post a new tweet
router.post("/new", (req, res) => {
  let newTweet = new Tweet({
    creator: req.body.creator,
    text: req.body.text
  });

  newTweet.save().then(doc => res.send(doc));
});

module.exports = router;
