const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

authRouter.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

authRouter.get("/auth/current_user", (req, res) => {
  res.send(req.user);
  console.log(req.user);
});

authRouter.get("/auth/isAuthenticated", function(req, res) {
  if (req.user) {
    console.log(req.user);
    res.send(req.user);
  } else {
    console.log("Not logged in");
    res.send("Not logged in");
  }
});

module.exports = authRouter;
