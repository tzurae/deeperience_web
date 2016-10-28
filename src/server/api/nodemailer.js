import assign from 'object-assign';
import nodemailer from 'nodemailer';
import configs from '../../../configs/project/server';

let defaultTransport;
if (configs.nodemailer) {
  defaultTransport = configs.nodemailer[process.env.NODE_ENV];
}

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
        if (process.env.NODE_ENV !== 'test' && err) {
          return reject(err);
        }
        return resolve(info);
      });
    }),
  };
};
