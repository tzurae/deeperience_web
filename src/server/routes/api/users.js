import express from 'express'
import userController from '../../controllers/user'
import bodyParser from '../../middlewares/bodyParser'
import validate from '../../middlewares/validate'
import mailController from '../../controllers/mail'
import authRequired from '../../middlewares/authRequired'
import roleRequired from '../../middlewares/roleRequired'
import Roles from '../../../common/constants/Roles'
import configs from '../../../../configs/project/server'
import fileUpload from '../../middlewares/fileUpload'

const users = express.Router()

users.get('/',
  authRequired,
  roleRequired([Roles.ADMIN]),
  userController.list
)
users.post('/',
  bodyParser.json,
  validate.recaptcha,
  userController.create,
  mailController.sendVerification
)
users.post('/email/verify',
  bodyParser.json,
  bodyParser.jwt(
    'verifyEmailToken',
    configs.jwt.verifyEmail.secret
  ),
  validate.verifyUserNonce('verifyEmail'),
  userController.verifyEmail
)
users.post('/email/request-verify',
  bodyParser.json,
  validate.form('user/VerifyEmailForm'),
  validate.recaptcha,
  userController.setNonce('verifyEmail'),
  mailController.sendVerification
)
users.post('/login', bodyParser.json, userController.login)
users.post('/password/request-reset',
  bodyParser.json,
  validate.form('user/ForgetPasswordForm'),
  validate.recaptcha,
  userController.setNonce('resetPassword'),
  mailController.sendResetPasswordLink
)
users.put('/password',
  bodyParser.json,
  bodyParser.jwt(
    'resetPasswordToken',
    configs.jwt.resetPassword.secret
  ),
  validate.verifyUserNonce('resetPassword'),
  validate.form('user/ResetPasswordForm'),
  userController.resetPassword
)
users.get('/logout', userController.logout)
users.get('/me', authRequired, userController.show)
users.put('/me',
  authRequired,
  bodyParser.json,
  validate.form('user/PersonalDataForm'),
  userController.update
)
users.put('/me/avatarURL',
  authRequired,
  bodyParser.json,
  userController.updateAvatarURL
)
users.put('/me/password',
  authRequired,
  bodyParser.json,
  validate.form('user/ChangePasswordForm'),
  userController.updatePassword
)

if (configs.firebase) {
  const firebaseController = require('../../controllers/firebase').default
  users.get('/me/firebase/token',
    authRequired, firebaseController.readToken)
}
users.post('/me/avatar',
  authRequired,
  fileUpload.disk({
    destination: 'tmp/{userId}',
  }).fields([{ name: 'avatar' }]),
  validate.form('user/AvatarForm'),
  userController.uploadAvatar)

export default users
