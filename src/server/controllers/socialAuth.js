import passport from 'passport';

export default {
  initFacebook: (req, res, next) => (
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'],
      state: JSON.stringify({ next: req.query.next }),
    })(req, res, next)
  ),
  initLinkedin: (req, res, next) => (
    passport.authenticate('linkedin', {
      state: JSON.stringify({
        next: req.query.next,
        random: Math.random(),
      }),
    })(req, res, next)
  ),
};
