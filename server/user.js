const express = require("express");
const router = express.Router();
const User = require("./models/User");

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

module.exports = router;
