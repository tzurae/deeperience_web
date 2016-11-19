module.exports = {
  // ref:
  //   - <https://github.com/nodemailer/nodemailer#using-well-known-services>
  //   - <https://github.com/nodemailer/nodemailer-wellknown#supported-services>
  development: {
    service: 'gmail',
    auth: {
      user: 'noreply@deeperience.com',
      pass: 'qtasmgdaliqzgbev',
    },
  },
  test: {
    service: 'gmail',
    auth: {
      user: 'noreply@deeperience.com',
      pass: 'qtasmgdaliqzgbev',
    },
  },
  production: {
    service: 'gmail',
    auth: {
      user: 'noreply@deeperience.com',
      pass: 'qtasmgdaliqzgbev',
    },
  },
}
