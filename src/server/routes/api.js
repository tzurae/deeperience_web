import configs from '../../../configs/project/server';
import bodyParser from '../middlewares/bodyParser';
import authRequired from '../middlewares/authRequired';
import fileUpload from '../middlewares/fileUpload';
import userController from '../controllers/user';
import formValidationController from '../controllers/formValidation';
import localeController from '../controllers/locale';
import todoController from '../controllers/todo';

export default ({ app }) => {
  // user
  app.post('/api/user', bodyParser.json, userController.create);
  app.post('/api/user/login', bodyParser.json, userController.login);
  app.get('/api/user/logout', userController.logout);
  app.get('/api/user/me', authRequired, userController.show);
  app.put('/api/user/me', authRequired, bodyParser.json, userController.update);
  if (configs.firebase) {
    let firebaseController = require('../controllers/firebase').default;
    app.get('/api/user/me/firebase/token',
      authRequired, firebaseController.readToken);
  }
  app.post('/api/user/me/avatar',
    authRequired,
    fileUpload.disk({
      destination: 'user/{userId}',
      filename: 'avatar.jpg',
    }).single('avatar'),
    userController.uploadAvatar);

  // form
  app.post('/api/forms/register/fields/email/validation',
    bodyParser.json,
    formValidationController.register.email
  );

  // locale
  app.get('/api/locale/:locale', localeController.show);

  // todo
  app.post('/api/todo', bodyParser.json, todoController.create);
  app.get('/api/todo', todoController.list);
  app.delete('/api/todo/:id', todoController.remove);
};
