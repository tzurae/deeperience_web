import passport from 'passport';

export default (strategyName) => (req, res, next) => (
  passport.authenticate(strategyName, {
    failureRedirect: '/user/login',
    session: false,
  }, (err, user, info) => {
    if (err || !user) {
      return res.redirect('/user/login');
    }
    // mount user instance
    req.user = user;
    next();
  })(req, res, next)
);
