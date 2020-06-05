const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, { msg: "That email is not registered" });
            }
            bcrypt.compare(password, user.password, (error, isMatch) => {
              if (error) throw error;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { msg: "Invalid password" });
              }
            });
          })
          .catch((error) => console.log(error));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
