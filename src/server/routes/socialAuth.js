import passportAuth from '../middlewares/passportAuth'
import socialAuthController from '../controllers/socialAuth'
import userController from '../controllers/user'
import configs from '../../../configs/project/server'
import bodyParser from '../middlewares/bodyParser'
import passport from 'passport'

export default ({ app }) => {
  // facebook
  if (configs.passportStrategy.facebook) {
    app.get('/auth/facebook', socialAuthController.initFacebook)
    app.get('/auth/facebook/callback',
      passportAuth('facebook'),
      userController.socialLogin
    )
    // app.get('/auth/facebook/callback',
    //   passport.authenticate('facebook', { failureRedirect: '/login', session: false,}),
    //   function (req, res) {
    //   res.redirect('/')
    //   }
    // )
    app.post('/auth/facebook/phone',
      bodyParser.json,
      socialAuthController.createUser,
      userController.socialLoginPhone,
    )
  } else {
    app.get('/auth/facebook', socialAuthController.setupError)
  }
}
