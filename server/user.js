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
  user.save().then(doc => res.send(doc), err => res.status(400).send(err));
});

// Find all tweets by user_id
router.get("/:user_id/tweets", (req, res) => {
  let creator = req.params.user_id;
  Tweet.find({ creator }).then(docs => {
    res.send(docs);
  });
});

// Make a user inactive
router.delete("/deleteId=:delete_id", (req, res) => {
  let delete_id = req.params.delete_id;
  User.findOneAndUpdate({ _id: delete_id }, { $set: { isActive: false } })
    .then(user => {
      res.send(user);
    })
    .catch(err => res.status(400).send(err));
});

// Like a tweet
// router.post("/like/", (req, res) => {
//   let tweet_id = req.body.tweet_id;
//   let user_id = req.body.user_id;
//
//   User.findByIdAndUpdate(
//     { _id: user_id },
//     {$push: {"likes": tweet_id}},
//     {new: true},
//     (user => console.log(user)));
//
//   res.send("hi");
// });

module.exports = router;