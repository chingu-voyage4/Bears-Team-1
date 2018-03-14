const express = require("express");
const router = express.Router();
const User = require("./models/User");
const Tweet = require("./models/Tweet");

// Get all users
router.get("/all", function(req, res) {
  User.find().then(
    users => {
      res.send(users);
    },
    err => res.status(400).send(err)
  );
});

// Add a new user
router.post("/new", function(req, res) {
  let user = new User({
    userInfo: {
      username: req.body.userInfo.username,
      firstName: req.body.userInfo.firstName,
      lastName: req.body.userInfo.lastName
    }
  });
  user
    .save()
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err));
});

// Find all tweets by user_id
router.get("/:user_id/tweets", (req, res) => {
  let creator = req.params.user_id;
  Tweet.find({ creator })
    .then(docs => {
      res.send(docs);
    })
    .catch(err => res.status(400).send(err));
});

// Make a user inactive
router.put("/:delete_id", (req, res) => {
  let delete_id = req.params.delete_id;
  User.findOneAndUpdate({ _id: delete_id }, { $set: { isActive: false } })
    .then(user => {
      res.send(user);
    })
    .catch(err => res.status(400).send(err));
});

// Handle likes
router.post("/:user_id/likes/", (req, res) => {
  let tweet_id = req.body.tweet_id;
  let user_id = req.params.user_id;
  let isLiked = req.body.isLiked;

  if (isLiked) {
    console.log("liked");
    User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { likes: tweet_id } },
      // Returns the updated document
      { new: true },
      (err, user) => {
        console.log("found user", user);
        res.send(user);
      }
    ).catch(err => res.status(400).send(err));
  } else if (!isLiked) {
    // User.findById({_id: user_id}).where({ likes: { "$in" : [tweet_id]} }).then(user => {
    User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { likes: [tweet_id] } },
      { new: true }
    )
      .then(user => {
        console.log(user);
        res.send({
          likesNum: user.likes.length
        });
        // })
      })
      .catch(err => res.status(400).send(err));
  } else {
    res.send("Must include isLiked boolean value to process this request");
  }
});

// Get a user's likes
router.get("/:user_id/likes", (req, res) => {
  let user_id = req.params.user_id;

  User.findById({ _id: user_id })
    .populate("likes")
    .then(user => {
      res.send({
        likes: user.likes,
        likesNum: user.likes.length
      });
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
