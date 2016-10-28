module.exports = {
  // ref:
  //   - <https://github.com/nodemailer/nodemailer#using-well-known-services>
  //   - <https://github.com/nodemailer/nodemailer-wellknown#supported-services>
  development: {
    service: 'gmail',
    auth: {
      user: 'your_gmail_username',
      pass: 'your_gmail_password',
    },
  },
  test: {
    service: 'gmail',
    auth: {
      user: 'your_gmail_username',
      pass: 'your_gmail_password',
    },
  },
  production: {
    service: 'gmail',
    auth: {
      user: 'your_gmail_username',
      pass: 'your_gmail_password',
    },
  },
};
