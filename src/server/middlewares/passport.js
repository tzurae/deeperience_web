import reactCookie from 'react-cookie';
import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
import credentials from '../../../config/credentials';
import User from '../models/User';

const cookieExtractor = (req) => {
  return reactCookie.load('token');
};

passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
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
