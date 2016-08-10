import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// and import User and your config with the secret
import User from '../models/user_model';
import config from '../config';

// options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = { usernameField: 'email' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};


// username + password authentication strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // should find user by email and check password
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // is called with confirmed jwt we just need to confirm that user exits
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
