import passport from 'passport';
import Errors from '../../common/constants/Errors';

const authRequired = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info && info.name === 'TokenExpiredError') {
      return res.errors([Errors.TOKEN_EXPIRATION]);
    }
    if (!user) {
      // custom 401 message
      res.pushError(Errors.USER_UNAUTHORIZED, {
        detail: info && info.toString(),
      });
      return res.errors();
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authRequired;
