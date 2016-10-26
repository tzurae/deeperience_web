import assign from 'object-assign';
import nodemailer from 'nodemailer';
import configs from '../../../configs/project/server';

let defaultTransport = (
  `smtps://${configs.gmail[process.env.NODE_ENV].username}%40gmail.com:` +
  `${configs.gmail[process.env.NODE_ENV].password}@smtp.gmail.com`
);

export default (transport = defaultTransport) => {
  let transporter = nodemailer.createTransport(transport);
  return {
    sendMail: (mailOptions) => new Promise((resolve, reject) => {
      mailOptions = assign(
        {},
        configs.mailOptions.default,
        configs.mailOptions[process.env.NODE_ENV],
        mailOptions
      );
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return reject(err);
        }
        return resolve(info);
      });
    }),
  };
};
