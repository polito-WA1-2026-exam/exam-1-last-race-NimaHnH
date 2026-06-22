import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { getUser } from './db/queries.js';
// Passport configuration for local authentication

// Authenticate users with username and password
passport.use(
  new LocalStrategy(
    async (username, password, done) => {

      try {
        // Find the user in the database
        const user = await getUser(username);

        if (!user) {
          return done(null, false);
        }
        // Check whether the password is correct
        const valid = await bcrypt.compare(
          password,
          user.password
        );

        if (!valid) {
          return done(null, false);
        }
        // Authentication successful
        return done(null, {
          username: user.username
        });

      }
      catch (err) {

        return done(err);

      }

    }
  )
);
// Save the username in the session
passport.serializeUser((user, done) => {
  done(null, user.username);
});
// Get user information from the session
passport.deserializeUser((username, done) => {
  done(null, { username });
});

export default passport;