import authRequired from '../middlewares/authRequired';
import userController from '../controllers/user';
import todoController from '../controllers/todo';
import reactController from '../controllers/react';

export default ({ app }) => {
  app.post('/api/user', userController.create);
  app.post('/api/user/login', userController.login);
  app.get('/api/user/logout', userController.logout);
  app.get('/api/user/me', authRequired, userController.show);
  app.post('/api/todo', todoController.create);
  app.get('/api/todo', todoController.list);
  app.delete('/api/todo/:id', todoController.remove);
  app.get('/*', reactController.render);
};