const express = require("express");
const router = express.Router();
const Tweet = require("./models/Tweet");

const authCheck = (req, res, next) => {
  if (req.user) {
    // If logged in
    next();
  } else {
    // If user is not logged in
    console.log("Please log in to complete your request");
    res.redirect("/auth/google");
  }
};

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
router.post("/new", authCheck, (req, res) => {
  const newTweet = new Tweet({
    creator: req.user._id,
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

router.put("/:tweet_id/comment", (req, res) => {
  const tweet_id = req.params.tweet_id;
  const comment = req.body;

  Tweet.findById({ _id: tweet_id })
    .then(tweet => {
      tweet.comments.push({
        user: comment.user,
        text: comment.text
      });
      res.send(tweet);
    })
    .catch(err => res.status(400).send(err));
});

router.put("/:tweet_id/reply", (req, res) => {
  const tweet_id = req.params.tweet_id;
  const { comment_id, user, text } = req.body;

  Tweet.findById({ _id: tweet_id })
    .where("comments._id")
    .equals(comment_id)
    .then(doc => {
      doc.comments[0].replies.push({
        user,
        text
      });
      res.send(doc);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
