module.exports = {
  default: {
    // ref: <https://developers.facebook.com/docs/graph-api/reference/user>
    profileFields: ['id', 'displayName', 'email', 'picture'],
  },
  development: {
    clientID: '1752027395060427',
    clientSecret: 'bbda6432fad50440ca94cfb7bb041e33',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  test: {
    clientID: '1752027395060427',
    clientSecret: 'bbda6432fad50440ca94cfb7bb041e33',
    callbackURL: 'http://localhost:5566/auth/facebook/callback',
  },
  production: {
    clientID: '1726716050924895',
    clientSecret: '0d608c5aae4611a13d0754706623e1df',
    callbackURL: 'https://deeperience.herokuapp.com/auth/facebook/callback',
  },
};
