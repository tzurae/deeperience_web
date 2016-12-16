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
import guideSiteController from '../controllers/guideSite'
import googleSiteController from '../controllers/googleSite'
import postController from '../controllers/post'
import zoom from '../controllers/zoom'

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
  app.get('/api/trips/buy', authRequired, tripController.listBuyTrip)

  // trip for guide
  app.get('/api/trips/own', authRequired, tripController.listOwnTrip) // todo
  app.post('/api/trips', authRequired, bodyParser.json, tripController.create) // todo
  app.put('/api/trips/:tripId', authRequired, bodyParser.json, tripController.update) // todo
  app.delete('/api/trips/:tripId', authRequired, bodyParser.json, tripController.remove)

  app.post('/api/trips/image',
    authRequired,
    fileUpload.disk({
      destination: 'tmp/{userId}',
    }).fields([{ name: 'img' }]),
    tripController.uploadImage
    )

  // site
  app.get('/api/guideSites', authRequired, guideSiteController.list) // todo
  app.post('/api/guideSites', authRequired, bodyParser.json, guideSiteController.create)
  app.put('/api/guideSites/:guideSiteId', authRequired, bodyParser.json, guideSiteController.update) // todo
  app.delete('/api/guideSites/:guideSiteId', authRequired, guideSiteController.remove) // todo

  // zoom
  app.get('/api/zoom', authRequired, zoom.create)
  app.delete('/api/zoom/:meetingId', authRequired, bodyParser.json, zoom.end, zoom.delete)

  // GoogleSite
  app.post('/api/googleSites', authRequired, bodyParser.json, googleSiteController.create)

  // post
  app.get('/api/posts/', authRequired, postController.list) // todo
  app.post('/api/posts/', authRequired, bodyParser.json, postController.create) // todo
  app.put('/api/posts/:postId', authRequired, bodyParser.json, postController.update) // todo
  app.delete('/api/posts/:postId', authRequired, postController.remove) // todo
}
