import superagent from 'superagent';
import Errors from '../../common/constants/Errors';
import serverConfigs from '../../../configs/project/server';
import clientConfigs from '../../../configs/project/client';

export default (req, res, next) => {
  if (process.env.NODE_ENV === 'test' || !clientConfigs.recaptcha) {
    return next();
  }
  superagent
    .post('https://www.google.com/recaptcha/api/siteverify')
    .type('form')
    .send({
      secret: serverConfigs.recaptcha[process.env.NODE_ENV].secretKey,
      response: req.body.recaptcha,
    })
    .end((err, { body } = {}) => {
      if (err) {
        res.pushError(Errors.UNKNOWN_EXCEPTION, {
          meta: err,
        });
        return res.errors();
      }
      if (!body.success) {
        res.pushError(Errors.INVALID_RECAPTCHA, {
          meta: body['error-codes'],
        });
        return res.errors();
      }
      next();
    });
};
