const express = require("express");
const router = express.Router();
const Tweet = require("./models/Tweet");

// Get all tweets
router.get("/all", (req, res) => {
  Tweet.find()
    .then(tweets => {
      res.send(tweets);
    })
    .catch(err => res.status(400).send(err));
});

// Post a new tweet
router.post("/new", (req, res) => {
  let newTweet = new Tweet({
    creator: req.body.creator,
    text: req.body.text
  });

  newTweet
    .save()
    .then(doc => res.send(doc))
    .catch(err => res.send(err));
});

router.delete("/:delete_id", (req, res) => {
  let delete_id = req.params.delete_id;
  Tweet.findOneAndRemove({ _id: delete_id })
    .then(tweet => res.send(tweet))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
