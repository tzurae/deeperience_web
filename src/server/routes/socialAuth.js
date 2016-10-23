import socialAuthController from '../controllers/socialAuth';

export default ({ app }) => {
  // facebook
  app.get('/auth/facebook', socialAuthController.initFacebook);
};
