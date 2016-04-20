import passport from 'passport';

const authRequired = passport.authenticate('jwt', {
  session: false,
});

export default authRequired;