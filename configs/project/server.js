module.exports = {
  jwt: {
    secret: '4eO5viHe23',
    expiresIn: 60 * 60 * 24 * 3, // in seconds
  },
  mongo: require('./mongo/credential'),
  firebase: require('./firebase/credential.json'),
};
