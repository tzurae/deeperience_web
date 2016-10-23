import passport from 'passport';

export default {
  initFacebook: passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
  initLinkedin: passport.authenticate('linkedin', {
    state: Math.random(),
  }),
};
