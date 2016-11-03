import configs from '../../../configs/project/server'
import Roles from '../../common/constants/Roles'
import FormNames from '../../common/constants/FormNames'
import bodyParser from '../middlewares/bodyParser'
import authRequired from '../middlewares/authRequired'
import roleRequired from '../middlewares/roleRequired'
import validate from '../middlewares/validate'
import fileUpload from '../middlewares/fileUpload'
import userController from '../controllers/user'
import mailController from '../controllers/mail'
import formValidationController from '../controllers/formValidation'
import localeController from '../controllers/locale'
import todoController from '../controllers/todo'
import tripController from '../controllers/trip'
import siteController from '../controllers/site'
import postController from '../controllers/post'

export default ({ app }) => {
  // user
  app.get('/api/users',
    authRequired,
    roleRequired([Roles.ADMIN]),
    userController.list
  )
  app.post('/api/users',
    bodyParser.json,
    validate.recaptcha,
    userController.create,
    mailController.sendVerification
  )
  app.post('/api/users/email/verify',
    bodyParser.json,
    bodyParser.jwt(
      'verifyEmailToken',
      configs.jwt.verifyEmail.secret
    ),
    validate.verifyUserNonce('verifyEmail'),
    userController.verifyEmail
  )
  app.post('/api/users/email/request-verify',
    bodyParser.json,
    validate.form('user/VerifyEmailForm'),
    validate.recaptcha,
    userController.setNonce('verifyEmail'),
    mailController.sendVerification
  )
  app.post('/api/users/login', bodyParser.json, userController.login)
  app.post('/api/users/password/request-reset',
    bodyParser.json,
    validate.form('user/ForgetPasswordForm'),
    validate.recaptcha,
    userController.setNonce('resetPassword'),
    mailController.sendResetPasswordLink
  )
  app.put('/api/users/password',
    bodyParser.json,
    bodyParser.jwt(
      'resetPasswordToken',
      configs.jwt.resetPassword.secret
    ),
    validate.verifyUserNonce('resetPassword'),
    validate.form('user/ResetPasswordForm'),
    userController.resetPassword
  )
  app.get('/api/users/logout', userController.logout)
  app.get('/api/users/me', authRequired, userController.show)
  app.put('/api/users/me',
    authRequired,
    bodyParser.json,
    validate.form('user/EditForm'),
    userController.update
  )
  app.put('/api/users/me/avatarURL',
    authRequired,
    bodyParser.json,
    userController.updateAvatarURL
  )
  app.put('/api/users/me/password',
    authRequired,
    bodyParser.json,
    validate.form('user/ChangePasswordForm'),
    userController.updatePassword
  )
  if (configs.firebase) {
    const firebaseController = require('../controllers/firebase').default
    app.get('/api/users/me/firebase/token',
      authRequired, firebaseController.readToken)
  }
  app.post('/api/users/me/avatar',
    authRequired,
    fileUpload.disk({
      destination: 'tmp/{userId}',
      filename: 'avatar.jpg',
    }).fields([{ name: 'avatar' }]),
    validate.form('user/AvatarForm'),
    userController.uploadAvatar)

  // form
  app.post(`/api/forms/${FormNames.USER_REGISTER}/fields/email/validation`,
    bodyParser.json,
    formValidationController[FormNames.USER_REGISTER].email
  )
  app.post(
    `/api/forms/${FormNames.USER_VERIFY_EMAIL}/fields/email/validation`,
    bodyParser.json,
    formValidationController[FormNames.USER_VERIFY_EMAIL].email
  )
  app.post(
    `/api/forms/${FormNames.USER_FORGET_PASSWORD}/fields/email/validation`,
    bodyParser.json,
    formValidationController[FormNames.USER_FORGET_PASSWORD].email
  )

  // locale
  app.get('/api/locales/:locale', localeController.show)

  // todo
  app.get('/api/todos', todoController.list)
  app.post('/api/todos', bodyParser.json, todoController.create)
  app.put('/api/todos/:id', bodyParser.json, todoController.update)
  app.delete('/api/todos/:id', todoController.remove)

  // trip for customer
  app.get('/api/trips/buy/:userId', authRequired, tripController.listBuyTrip)

  // trip for guide
  app.get('/api/trips/own/:userId', authRequired, tripController.listOwnTrip)
  app.post('/api/trips/:userId', authRequired, bodyParser.json, tripController.create)
  app.put('/api/trips/:userId/:tripId', authRequired, bodyParser.json, tripController.update)
  app.delete('/api/trips/:userId/:tripId', authRequired, bodyParser.json, tripController.remove)

  // site
  app.get('/api/sites/:userId', authRequired, siteController.list)
  app.post('/api/sites/:userId', authRequired, bodyParser.json, siteController.create)
  app.put('/api/sites/:userId/:siteId', authRequired, bodyParser.json, siteController.update)
  app.delete('/api/sites/:userId/:siteId', authRequired, bodyParser.json, siteController.remove)

  // post
  app.get('/api/posts/:userId', authRequired, postController.list)
  app.post('/api/posts/:userId', authRequired, bodyParser.json, postController.create)
  app.put('/api/posts/:userId/:postId', authRequired, bodyParser.json, postController.update)
  app.delete('/api/posts/:userId/:postId', authRequired, bodyParser.json, postController.remove)
}
