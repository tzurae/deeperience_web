module.exports = {
  default: {
    // ref: <https://developers.facebook.com/docs/graph-api/reference/user>
    profileFields: ['id', 'displayName', 'email', 'picture'],
  },
  development: {
    clientID: '121212121212121',
    clientSecret: 'abcedfghi123456789abcdefghi12345',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  test: {
    clientID: '121212121212121',
    clientSecret: 'abcedfghi123456789abcdefghi12345',
    callbackURL: 'http://localhost:5566/auth/facebook/callback',
  },
  production: {
    clientID: '343434343434343',
    clientSecret: 'abcedfghi123456789abcdefghi12345',
    callbackURL: 'https://express-react-hmr-boilerplate.herokuapp.com/auth/facebook/callback',
  },
};
