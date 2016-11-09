import passportAuth from '../middlewares/passportAuth';
import socialAuthController from '../controllers/socialAuth';
import userController from '../controllers/user';
import configs from '../../../configs/project/server';

export default ({ app }) => {
  // facebook
  if (configs.passportStrategy.facebook) {
    app.get('/auth/facebook', socialAuthController.initFacebook);
    app.get('/auth/facebook/callback',
      passportAuth('facebook'),
      userController.socialLogin
    );
  } else {
    app.get('/auth/facebook', socialAuthController.setupError);
  }
  // linkedin
  if (configs.passportStrategy.linkedin) {
    app.get('/auth/linkedin', socialAuthController.initLinkedin);
    app.get('/auth/linkedin/callback',
      passportAuth('linkedin'),
      userController.socialLogin
    );
  } else {
    app.get('/auth/linkedin', socialAuthController.setupError);
  }
};
