import passport from 'passport';
import user from '../controllers/user';

export default ({ app }) => {
  const authRequired = passport.authenticate('jwt', {
    session: false,
  });
  app.post('/api/user', user.create);
  app.post('/api/user/login', user.login);
  app.get('/api/user/logout', user.logout);
  app.get('/api/user/me', authRequired, user.show);
};