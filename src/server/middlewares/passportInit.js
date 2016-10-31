import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as OAuthLinkedinStrategy } from 'passport-linkedin-oauth2';
import configs from '../../../configs/project/server';
import { redirect } from '../../common/actions/routeActions';
import Errors from '../../common/constants/Errors';
import { handleDbError } from '../decorators/handleError';
import User from '../models/User';

let cookieExtractor = (req) => {
  return req.store.getState().cookies.token;
};

export default (req, res, next) => {
  function findOrCreateUser(schemaProfileKey, email, cb) {
    if (!email) {
      res.pushError(Errors.AUTHORIZATION_FAIL, {
        requiredFields: ['email'],
      });
      req.store.dispatch(redirect('/user/login'));
      return next();
    }
    User.findOne({ 'email.value': email }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        user = new User({
          avatarURL: '', // overwrite default avatar
        });
      }
      if (!user.social.profile[schemaProfileKey]) {
        user.social.profile[schemaProfileKey] = {};
      }
      return cb(null, user);
    });
  }

  passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: configs.jwt.authentication.secret,
  }, (jwtPayload, done) => {
    // this callback is invoked only when jwt token is correctly decoded
    User.findById(jwtPayload._id, handleDbError(res)((user) => {
      done(null, user);
    }));
  }));

  if (configs.passportStrategy.facebook) {
    passport.use(new FacebookStrategy({
      ...configs.passportStrategy.facebook.default,
      ...configs.passportStrategy.facebook[process.env.NODE_ENV],
    }, (req, accessToken, refreshToken, profile, done) => {
      findOrCreateUser(
        'facebook',
        profile._json.email,
        handleDbError(res)((user) => {
          // map `facebook-specific` profile fields to our custom profile fields
          user.social.profile.facebook = profile._json;
          user.email.value = user.email.value || profile._json.email;
          user.name = user.name || profile._json.name;
          user.avatarURL = user.avatarURL || profile._json.picture.data.url;
          done(null, user);
        }));
    }));
  }

  if (configs.passportStrategy.linkedin) {
    passport.use(new OAuthLinkedinStrategy({
      ...configs.passportStrategy.linkedin.default,
      ...configs.passportStrategy.linkedin[process.env.NODE_ENV],
    }, (req, accessToken, refreshToken, profile, done) => {
      findOrCreateUser(
        'linkedin',
        profile._json.emailAddress,
        handleDbError(res)((user) => {
          // map `linkedin-specific` profile fields to our custom profile fields
          user.social.profile.linkedin = profile._json;
          user.email.value = user.email.value || profile._json.emailAddress;
          user.name = user.name || profile._json.formattedName;
          user.avatarURL = user.avatarURL || profile._json.pictureUrl;
          done(null, user);
        })
      );
    }));
  }

  passport.initialize()(req, res, next);
};
