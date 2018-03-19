const passport = require("passport");

module.exports = app => {
  //The routes are simple, each auth route is setup like /auth/(authStrategy).
  //The callback route is also setup like /auth/(authStrategy)/callback

  //GOOGLE
  app.get(
    "/auth/google", //When the user visits /auth/google, passport redirects the user to google auth with a request.
    passport.authenticate(
      "google" /*'google' is the identifying name of the Google oAuth Strategy*/,
      {
        scope: ["profile", "email"] //Here we request for the user's public email and profile.
      }
    )
  );

  //When the user accepts the authentication, google redirects the user to /auth/google/callback.
  //Moreover, google also sends the user data a to our server for us to use.
  app.get("/auth/google/callback", passport.authenticate("google"));

  //GITHUB
  app.get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["read:user", "user:email"] //Here we aks for the user's public github email and profile.
    })
  );

  app.get("/auth/github/callback", passport.authenticate("github"));
};
