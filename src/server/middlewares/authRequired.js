import passport from 'passport';

const authRequired = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // custom 401 message
      return res.status(401).json({
        isError: true,
        info,
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authRequired;