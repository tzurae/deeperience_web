if (process.env.TRAVIS) {
  if (!process.env.PROJECT_SERVER_CONFIGS) {
    throw new Error(
      'Environment variable `PROJECT_SERVER_CONFIGS` is not set. ' +
      'Please dump it by running `gulp dumpConfigs`'
    );
  }
  module.exports = JSON.parse(process.env.PROJECT_SERVER_CONFIGS);
} else {
  module.exports = {
    host: {
      development: 'http://localhost:3000',
      test: 'http://localhost:5566',
      production: 'https://express-react-hmr-boilerplate.herokuapp.com',
    },
    jwt: {
      authentication: {
        secret: '4eO5viHe23',
        expiresIn: 60 * 60 * 24 * 3, // in seconds
      },
      verifyEmail: {
        secret: 'df5s6sdHdjJdRg56',
        expiresIn: 60 * 60, // in seconds
      },
      resetPassword: {
        secret: 'FsgWqLhX0Z6JvJfPYwPZ',
        expiresIn: 60 * 60, // in seconds
      },
    },
    mongo: require('./mongo/credential'),
    firebase: require('./firebase/credential.json'),
    passportStrategy: {
      facebook: require('./passportStrategy/facebook/credential'),
      linkedin: require('./passportStrategy/linkedin/credential'),
    },
    recaptcha: require('./recaptcha/credential'),
    nodemailer: require('./nodemailer/credential'),
    mailOptions: {
      default: {
        subject: 'Untitled Mail',
        from: 'Express-React-Hmr-Boilerplate <no-reply@express-react-hmr-boilerplate.com>',
        text: 'No Text',
        html: '<pre>no html content<pre>',
      },
      development: {
        to: 'gocreating@gmail.com',
      },
      test: {
        to: 'dont_sent_to_me_when_every_test@gmail.com',
      },
    },
  };
}
