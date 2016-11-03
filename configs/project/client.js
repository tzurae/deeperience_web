module.exports = {
  firebase: require('./firebase/client'),
  GA: {
    development: {
      trackingID: 'UA-86112397-2',
    },
    production: {
      trackingID: 'UA-86112397-1',
    },
  },
  recaptcha: require('./recaptcha/client'),
  fileUpload: {
    avatar: {
      maxSize: 1024 * 1024, // in bytes
      // MIME type
      validMIMETypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
      ],
    },
  },
};
