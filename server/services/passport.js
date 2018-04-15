const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        console.log(existingUser);
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            username: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleID: profile.id
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
