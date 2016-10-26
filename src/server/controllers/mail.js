import React from 'react';
import { renderToString } from 'react-dom/server';
import Errors from '../../common/constants/Errors';
import nodemailerAPI from '../api/nodemailer';
import VerfificationMail from '../components/VerificationMail';

export default {
  sendVerification(req, res) {
    let { user } = req;
    let token = user.toVerificationToken();

    nodemailerAPI()
      .sendMail({
        ...(
          process.env.NODE_ENV === 'production' ?
          { to: user.email.value } :
          {}
        ),
        subject: 'Email Verification',
        html: renderToString(
          <VerfificationMail token={token} />
        ),
      })
      .catch((err) => {
        res.errors([Errors.SEND_EMAIL_FAIL]);
        throw err;
      })
      .then((info) => {
        res.json({
          user: user,
          email: info.envelope,
        });
      });
  },
};
