const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '263671078273-nfeqvo1n288aou29onkkhp4sm939798o.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect",
  passReqToCallback: true // Passes the request object to the callback
}, 
function(request, accessToken, refreshToken, profile, done) {
  // Add a slight delay or asynchronous operation to prevent the callback from expiring
  setTimeout(() => {
    // passport callback function
    console.log('passport callback function fired:');
    console.log(profile);
    // Process user authentication here if needed
    return done(null, profile);
  }, 1000); // Adjust the delay time as needed
}
));

passport.serializeUser(function(user, done) {
  // Serialize only the user's ID to avoid circular references
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Find the user by ID and pass the user object to the callback
  User.findById(id, function(err, user) {
      done(err, user); // Pass user object to callback
  });
});
