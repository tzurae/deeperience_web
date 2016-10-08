import firebase from 'firebase';

export default {
  readToken(req, res) {
    // ref: <https://firebase.google.com/docs/auth/server#create_a_custom_token>
    let token = firebase.auth().createCustomToken(req.user._id.toString());
    res.json({
      token: token,
    });
  },
};
