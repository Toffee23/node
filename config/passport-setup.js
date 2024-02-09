const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2' ).Strategy;
const keys = require("../config/keys");


passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "https://localhost:3000/google/pains"
    }, () => {

    })
);

// passport.serializeUser(function(user, done) {
//    done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
//  });