//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//We will need the models folder to check passport against
var sequelize = require("../src/infra/database/models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    sequelize.Customer.findOne({
      where: {
        email: email
      }
    }).then(function(dbCustomer) {
      // If there's no user with the given email
      if (!dbCustomer) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbCustomer.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbCustomer);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(customer, cb) {
  cb(null, customer);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
