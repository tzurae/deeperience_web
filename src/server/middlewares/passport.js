import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import configs from '../../../configs/project/server';
import User from '../models/User';

const cookieExtractor = (req) => {
  return req.store.getState().cookie.token;
};

passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: configs.jwt.secret,
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
