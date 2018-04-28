const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
    console.log(req.user);
  });

  app.get("/auth/isAuthenticated", function(req, res) {
    if (req.user) {
      console.log(req.user);
      res.send(req.user);
    } else {
      console.log("Not logged in");
      res.send("Not logged in");
    }
  });
};
