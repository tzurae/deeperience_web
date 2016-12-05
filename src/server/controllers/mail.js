import React from 'react'
import { renderToString } from 'react-dom/server'
import Errors from '../../common/constants/Errors'
import nodemailerAPI from '../api/nodemailer'
import VerifyEmailMail from '../components/VerifyEmailMail'
import ResetPasswordMail from '../components/ResetPasswordMail'

export default {
  sendVerification(req, res) {
    const { user } = req
    const token = user.toVerifyEmailToken()

    nodemailerAPI()
      .sendMail({
        to: user.email.value,
        // ...(
        //   process.env.NODE_ENV === 'production' ?
        //   { to: user.email.value } :
        //   {}
        // )
        subject: 'Email Verification',
        html: renderToString(
          <VerifyEmailMail token={token} />
        ),
      })
      .catch((err) => {
        res.errors([Errors.SEND_EMAIL_FAIL])
        throw err
      })
      .then((info) => {
        res.json({
          user,
          email: info && info.envelope,
        })
      })
  },

  sendResetPasswordLink(req, res) {
    const { user } = req
    const token = user.toResetPasswordToken()

    nodemailerAPI()
      .sendMail({
        ...(
          process.env.NODE_ENV === 'production' ?
          { to: user.email.value } :
          {}
        ),
        subject: 'Reset Password Request',
        html: renderToString(
          <ResetPasswordMail
            requestedAt={new Date()}
            token={token}
          />
        ),
      })
      .catch((err) => {
        res.errors([Errors.SEND_EMAIL_FAIL])
        throw err
      })
      .then((info) => {
        res.json({
          email: info.envelope,
        })
      })
  },
}
