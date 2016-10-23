import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import configs from '../../../configs/project/server';
import User from '../models/User';

const cookieExtractor = (req) => {
  return req.store.getState().cookies.token;
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

function findOrCreateUser(schemaProfileKey, email, cb) {
  if (!email) {
    return cb(new Error('Email is required'));
  }
  User.findOne({ 'email.value': email }, (err, user) => {
    if (err) {
      return cb(err);
    }
    if (!user) {
      user = new User();
    }
    if (!user.social.profile[schemaProfileKey]) {
      user.social.profile[schemaProfileKey] = {};
    }
    return cb(null, user);
  });
}

passport.use(new FacebookStrategy({
  ...configs.passportStrategy.facebook.default,
  ...configs.passportStrategy.facebook[process.env.NODE_ENV],
}, (req, accessToken, refreshToken, profile, done) => {
  findOrCreateUser('facebook', profile._json.email, (err, user) => {
    if (err) {
      return done(err);
    }
    // map `facebook-specific` profile fields to our custom profile fields
    user.social.profile.facebook = profile._json;
    user.email.value = user.email.value || profile._json.email;
    user.name = user.name || profile._json.name;
    user.avatarURL = user.avatarURL || profile._json.picture.data.url;
    done(null, user);
  });
}));

const passportMiddleware = passport.initialize();
export default passportMiddleware;
