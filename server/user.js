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
  const creator = req.params.user_id;
  Tweet.find({ creator })
    .then(docs => {
      res.send(docs);
    })
    .catch(err => res.status(400).send(err));
});

// Make a user inactive
router.put("/:delete_id", (req, res) => {
  const delete_id = req.params.delete_id;
  User.findOneAndUpdate({ _id: delete_id }, { $set: { isActive: false } })
    .then(user => {
      res.send(user);
    })
    .catch(err => res.status(400).send(err));
});

// Handle likes
router.put("/:user_id/likes/", (req, res) => {
  const tweet_id = req.body.tweet_id;
  const user_id = req.params.user_id;
  const action = req.body.action;

  // Handle LIKE
  if (action === "like") {
    User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { likes: tweet_id } },
      // Returns the updated document
      { new: true }
    )
      .then(user => {
        res.send({
          user,
          likes: user.likes,
          likesNum: user.likes.length
        });
      })
      .catch(err => res.status(400).send(err));
  } else if (action === "unlike") {
    User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { likes: [tweet_id] } },
      { new: true }
    )
      .then(user => {
        res.send({
          user,
          likesNum: user.likes.length
        });
      })
      .catch(err => res.status(400).send(err));
  } else {
    res.send("Must include isLiked boolean value to process this request");
  }
});

// Get a user's likes
router.get("/:user_id/likes", (req, res) => {
  const user_id = req.params.user_id;

  User.findById({ _id: user_id })
    // Returns an array of Tweet documents in place of Object refs
    .populate("likes")
    .then(user => {
      res.send({
        likes: user.likes,
        likesNum: user.likes.length
      });
    })
    .catch(err => res.status(400).send(err));
});

// Handle Follow
router.put("/:user_id/following/", (req, res) => {
  const user_id = req.params.user_id;
  const self_id = req.body.self_id;
  const action = req.body.action;
  console.log("req.body", req.body);
  // Handle LIKE
  if (action === "follow") {
    User.findByIdAndUpdate(
      { _id: self_id },
      { $push: { following: user_id } },
      // Returns the updated document
      { new: true }
    )
      .then(() => {
        User.findById({ _id: self_id })
          // Returns an array of Tweet documents in place of Object refs
          .populate("following")
          .then(user => {
            res.send({
              following: user.following,
              followingNum: user.following.length
            });
          })
          .catch(err => res.status(400).send(err));
      })
      // .then(user => {
      //   res.send({
      //     following: user.following,
      //     followingNum: user.following.length,
      //   });
      // })
      // .catch(err => res.status(400).send(err));
      // }
      // else if (action === "unfollow") {
      //   User.findOneAndUpdate(
      //     { _id: user_id },
      //     { $pull: { likes: [tweet_id] } },
      //     { new: true }
      //   )
      //     .then(user => {
      //       res.send({
      //         user,
      //         likesNum: user.likes.length
      //       });
      //     })
      .catch(err => res.status(400).send(err));
    // } else {
    //   res.send("Must include isLiked boolean value to process this request");
  }
});

module.exports = router;
