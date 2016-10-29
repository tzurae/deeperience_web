import configs from '../../../configs/project/server';
import Roles from '../../common/constants/Roles';
import bodyParser from '../middlewares/bodyParser';
import verifyRecaptcha from '../middlewares/verifyRecaptcha';
import authRequired from '../middlewares/authRequired';
import roleRequired from '../middlewares/roleRequired';
import validate from '../middlewares/validate';
import fileUpload from '../middlewares/fileUpload';
import userController from '../controllers/user';
import mailController from '../controllers/mail';
import formValidationController from '../controllers/formValidation';
import localeController from '../controllers/locale';
import todoController from '../controllers/todo';

export default ({ app }) => {
  // user
  app.get('/api/users',
    authRequired,
    roleRequired([Roles.ADMIN]),
    userController.list
  );
  app.post('/api/users',
    bodyParser.json,
    verifyRecaptcha,
    userController.create,
    mailController.sendVerification
  );
  app.post('/api/users/email/verify',
    bodyParser.json,
    bodyParser.jwt(
      'verifyEmailToken',
      configs.jwt.verifyEmail.secret
    ),
    userController.verifyEmail
  );
  app.post('/api/users/login', bodyParser.json, userController.login);
  app.get('/api/users/logout', userController.logout);
  app.get('/api/users/me', authRequired, userController.show);
  app.put('/api/users/me',
    authRequired,
    bodyParser.json,
    validate('user/EditForm'),
    userController.update
  );
  app.put('/api/users/me/avatarURL',
    authRequired,
    bodyParser.json,
    userController.updateAvatarURL
  );
  app.put('/api/users/me/password',
    authRequired,
    bodyParser.json,
    validate('user/ChangePasswordForm'),
    userController.updatePassword
  );
  if (configs.firebase) {
    let firebaseController = require('../controllers/firebase').default;
    app.get('/api/users/me/firebase/token',
      authRequired, firebaseController.readToken);
  }
  app.post('/api/users/me/avatar',
    authRequired,
    fileUpload.disk({
      destination: 'users/{userId}',
      filename: 'avatar.jpg',
    }).single('avatar'),
    userController.uploadAvatar);

  // form
  app.post('/api/forms/userRegister/fields/email/validation',
    bodyParser.json,
    formValidationController.userRegister.email
  );

  // locale
  app.get('/api/locales/:locale', localeController.show);

  // todo
  app.get('/api/todos', todoController.list);
  app.post('/api/todos', bodyParser.json, todoController.create);
  app.put('/api/todos/:id', bodyParser.json, todoController.update);
  app.delete('/api/todos/:id', todoController.remove);
};
