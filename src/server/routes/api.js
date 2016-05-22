import bodyParser from '../middlewares/bodyParser';
import authRequired from '../middlewares/authRequired';
import userController from '../controllers/user';
import localeController from '../controllers/locale';
import todoController from '../controllers/todo';

export default ({ app }) => {
  app.post('/api/user', bodyParser.json, userController.create);
  app.post('/api/user/login', bodyParser.json, userController.login);
  app.get('/api/user/logout', userController.logout);
  app.get('/api/user/me', authRequired, userController.show);
  app.get('/api/locale/:locale', localeController.show);
  app.post('/api/todo', bodyParser.json, todoController.create);
  app.get('/api/todo', todoController.list);
  app.delete('/api/todo/:id', todoController.remove);
};
