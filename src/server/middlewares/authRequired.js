import passport from 'passport';

const authRequired = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // custom 401 message
      return res.json({
        isError: true,
        status: 401,
        errors: info && info.toString(),
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authRequired;