import authRequired from '../middlewares/authRequired';
import userController from '../controllers/user';
import reactController from '../controllers/react';

export default ({ app }) => {
  app.post('/api/user', userController.create);
  app.post('/api/user/login', userController.login);
  app.get('/api/user/logout', userController.logout);
  app.get('/api/user/me', authRequired, userController.show);
  app.get('/*', reactController.render);
};