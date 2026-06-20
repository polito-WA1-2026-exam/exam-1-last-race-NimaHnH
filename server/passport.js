import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { getUser } from './db/queries.js';

passport.use(
  new LocalStrategy(
    async (username, password, done) => {

      try {

        const user = await getUser(username);

        if (!user) {
          return done(null, false);
        }

        const valid = await bcrypt.compare(
          password,
          user.password
        );

        if (!valid) {
          return done(null, false);
        }

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

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, { username });
});

export default passport;