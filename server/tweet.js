const express = require("express");
const router = express.Router();
const Tweet = require("./models/Tweet");

// Get all tweets
router.get("/all", (req, res) => {
  Tweet.find({})
    .populate("creator")
    .exec(function(err, docs) {
      if (err) console.error;
      res.send(docs);
    });
});

// Post a new tweet
router.post("/new", (req, res) => {
  const newTweet = new Tweet({
    creator: req.body.creator,
    text: req.body.text
  });

  newTweet
    .save()
    .then(doc => res.send(doc))
    .catch(err => res.send(err));
});

router.delete("/:delete_id", (req, res) => {
  const delete_id = req.params.delete_id;
  Tweet.findOneAndRemove({ _id: delete_id }).then(tweet => res.send(tweet));
});

module.exports = router;
