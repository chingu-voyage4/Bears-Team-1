const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);
/*
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);
*/
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
  console.log(req.user);
});

router.get("/isAuthenticated", function(req, res) {
  if (req.user) {
    console.log(req.user);
    res.send(req.user);
  } else {
    console.log("Not logged in");
    res.send("Not logged in");
  }
});

module.exports = router;
