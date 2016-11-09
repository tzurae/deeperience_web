import passport from 'passport';

export default {
  setupError: (req, res) => {
    res.send(
      'Please setup and turn on `passportStrategy.&lt;social provider&gt;` ' +
      'of config file `configs/project/server.js`'
    );
  },
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
