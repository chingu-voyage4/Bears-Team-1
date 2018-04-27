const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // dev mode: http://localhost:3000/   prod mode: /
    res.redirect("/");
  }
);
/*
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );
*/
authRouter.get("/auth/logout", (req, res) => {
  req.logout();
  // dev mode: http://localhost:3000/   prod mode: /
  res.redirect("/");
  console.log("logged out");
});

authRouter.get("/auth/current_user", (req, res) => {
  res.send(req.user); //This grabs the current user and it's data.
  console.log(req.user); //We will want to also console log it.
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

const authCheck = (req, res, next) => {
  if (req.user) {
    // If logged in
    next();
  } else {
    // If user is not logged in
    console.log("Please log in to complete your request");
    res.redirect("/login");
  }
};

module.exports = authRouter;
