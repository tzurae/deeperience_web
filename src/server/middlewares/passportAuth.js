import passport from 'passport';
import handleError from '../decorators/handleError';

export default (strategyName) => (req, res, next) => (
  passport.authenticate(strategyName, {
    failureRedirect: '/user/login',
    session: false,
  }, handleError(res)((user, info) => {
    // mount user instance
    req.user = user;
    next();
  }))(req, res, next)
);
