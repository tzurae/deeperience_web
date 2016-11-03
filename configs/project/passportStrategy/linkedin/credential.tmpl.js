module.exports = {
  default: {
    scope: ['r_basicprofile', 'r_emailaddress'],
    passReqToCallback: true,
  },
  development: {
    clientID: '7a7a7a7a7a7a7a',
    clientSecret: 'B9B9B9B9B9B9B9B9',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback',
  },
  test: {
    clientID: '7a7a7a7a7a7a7a',
    clientSecret: 'B9B9B9B9B9B9B9B9',
    callbackURL: 'http://localhost:5566/auth/linkedin/callback',
  },
  production: {
    clientID: '7a7a7a7a7a7a7a',
    clientSecret: 'B9B9B9B9B9B9B9B9',
    callbackURL: 'https://express-react-hmr-boilerplate.herokuapp.com/auth/linkedin/callback',
  },
};
