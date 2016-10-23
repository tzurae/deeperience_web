import passportAuth from '../middlewares/passportAuth';
import socialAuthController from '../controllers/socialAuth';
import userController from '../controllers/user';

export default ({ app }) => {
  // facebook
  app.get('/auth/facebook', socialAuthController.initFacebook);
  app.get('/auth/facebook/callback',
    passportAuth('facebook'),
    userController.socialLogin
  );
};
