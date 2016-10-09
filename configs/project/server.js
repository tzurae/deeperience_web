if (process.env.TRAVIS) {
  if (!process.env.PROJECT_SERVER_CONFIGS) {
    throw new Error(
      'Environment variable `PROJECT_SERVER_CONFIGS` is not set. ' +
      'Please dump by running `gulp dumpConfigs`'
    );
  }
  module.exports = JSON.parse(process.env.PROJECT_SERVER_CONFIGS);
} else {
  module.exports = {
    jwt: {
      secret: '4eO5viHe23',
      expiresIn: 60 * 60 * 24 * 3, // in seconds
    },
    mongo: require('./mongo/credential'),
    firebase: require('./firebase/credential.json'),
  };
}
