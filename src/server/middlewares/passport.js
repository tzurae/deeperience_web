import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
import credentials from '../../../config/credentials';
import User from '../models/User';

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: credentials.jwt.secret,
}, (jwtPayload, done) => {
  User.findById(jwtPayload._id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

const passportMiddleware = passport.initialize();
export default passportMiddleware;