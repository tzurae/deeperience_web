import passport from 'passport';

export default {
  initFacebook: passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
};
