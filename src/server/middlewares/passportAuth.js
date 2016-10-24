import passport from 'passport';
import { redirect } from '../../common/actions/routeActions';
import Errors from '../../common/constants/Errors';

export default (strategyName) => (req, res, next) => (
  passport.authenticate(strategyName, {
    failureRedirect: '/user/login',
    session: false,
  }, (err, user, info) => {
    if (err || !user) {
      res.pushError(Errors.SOCIAL_AUTH_FAIL);
      req.store.dispatch(redirect('/user/login'));
      return next();
    }
    // mount user instance
    req.user = user;
    next();
  })(req, res, next)
);
