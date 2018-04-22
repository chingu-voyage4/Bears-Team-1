const express = require("express");
const router = express.Router();
const User = require("./models/User");
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

// Get all users
router.get("/all", function(req, res) {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => res.status(400).send(err));
});

// Add a new user
router.post("/new", function(req, res) {
  let user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  user
    .save()
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err));
});

// Get a specific user's scoops
router.get("/:user_id/scoops", (req, res) => {
  const creator = req.params.user_id;
  Tweet.find({ creator })
    .populate("creator")
    .exec(function(err, docs) {
      if (err) console.error;
      res.send(docs);
    });
});

// Get a signed in user's feed (scoops created by users whom the signed in user is following)
router.get("/feed", authCheck, (req, res) => {
  const self_id = req.user._id;

  User.findById(self_id, function(err, self) {
    // Get array of ObjectIDs (OIDs) from self and followed users
    let feedOIDs = [self.get("following"), self_id];

    // Turning our feedOID arr into an array of objects so that it will be accepted by $or
    let query = feedOIDs.map(user_id => {
      // Parse the array of OIDs into an array of objects
      return { creator: user_id };
    });

    // Returns all tweets from every user referenced in feedOIDs, sorts by date
    Tweet.find({ $or: query })
      .sort({ date: "descending" })
      .then(feed => {
        res.send(feed);
      });
  });
});

// Get a user's information
router.get("/:user_id/profile", (req, res) => {
  User.findById(req.params.user_id, function(err, user) {
    res.send(user);
  });
});

//Edit a user's information
router.put("/:user_id/profile", authCheck, (req, res) => {
  const user_id = req.params.user_id;
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const location = req.body.location;
  const about = req.body.about;
  const avatarUrl = req.body.avatarUrl;
  /* Block a signed in user from editing another user's profile?
  if (req.user._id != req.params.user_id) {
    console.log("Signed in user doesn't match profile being edited")
    res.send("Signed in user doesn't match profile being edited"); or err?
  }
*/

  User.findOneAndUpdate(
    { _id: user_id },
    {
      $set: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        location: location,
        about: about,
        avatarUrl: avatarUrl
      }
    },
    // Returns the updated document
    { new: true }
  )
    .then(user => res.send(user))
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

  // Handle LIKE
  let findIfLiked = new Promise(resolve => {
    User.findById({ _id: user_id })
      .then(user => {
        // Must cast likes array into a string or else you'll be comparing ObjectId === String
        let likes = user.get("likes", String);
        if (likes.includes(tweet_id)) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => res.status(400).send(err));
  });

  findIfLiked
    .then(isLiked => {
      // Like a tweet
      if (!isLiked) {
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
        // Unlike a tweet
      } else if (isLiked) {
        User.findOneAndUpdate(
          { _id: user_id },
          { $pull: { likes: tweet_id } },
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
    })
    .catch(err => res.status(400).send(err));
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

  if (action === "follow") {
    // Add the target user to "following"
    User.findByIdAndUpdate(
      { _id: self_id },
      { $push: { following: user_id } },
      // Returns the updated document
      { new: true }
    )
      .then(user => {
        res.send({
          following: user.following,
          followingNum: user.following.length
        });
      })
      .catch(err => res.status(400).send(err));

    // Add following user to target's "followers"
    User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { followers: self_id } },
      { new: true }
    ).catch(err => res.status(400).send(err));
  } else if (action === "unfollow") {
    User.findOneAndUpdate(
      { _id: self_id },
      { $pull: { following: user_id } },
      { new: true }
    )
      .then(user => {
        res.send({
          following: user.following,
          followingNum: user.following.length
        });
      })
      .catch(err => res.status(400).send(err));

    // Remove user from target's "followers"
    User.findByIdAndUpdate(
      { _id: user_id },
      { $pull: { followers: self_id } },
      { new: true }
    ).catch(err => res.status(400).send(err));
  } else {
    res.send("Must include isLiked boolean value to process this request");
  }
});

// Get all following a user
router.get("/:user_id/following", (req, res) => {
  const user_id = req.params.user_id;
  User.findById(user_id)
    .populate("following")
    .then(user => {
      res.send({
        following: user.following,
        followingNum: user.following.length
      });
    })
    .catch(err => res.status(400).send(err));
});

// Get all followers for a user
router.get("/:user_id/followers", (req, res) => {
  const user_id = req.params.user_id;
  User.findById(user_id)
    .populate("followers")
    .then(user => {
      res.send({
        followers: user.followers,
        followersNum: user.followers.length
      });
    })
    .catch(err => res.status(400).send(err));
});

// Find a user
router.get("/:searchterm/searchusers", (req, res) => {
  User.find({ username: req.params.searchterm }, (error, results) => {
    if (error) console.error;
    console.log(results);
    res.send(results);
  });
});

module.exports = router;
