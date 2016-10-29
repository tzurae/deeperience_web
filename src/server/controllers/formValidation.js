import FormNames from '../../common/constants/FormNames';
import { handleDbError } from '../decorators/handleError';
import User from '../models/User';

export default {
  [FormNames.USER_REGISTER]: {
    email(req, res) {
      User.findOne({
        'email.value': req.body.value,
      }, handleDbError(res)((user) => {
        if (user) {
          res.json({
            isPassed: false,
            message: 'The email is already registered',
          });
        } else {
          res.json({
            isPassed: true,
          });
        }
      }));
    },
  },

  [FormNames.USER_FORGET_PASSWORD]: {
    email(req, res) {
      User.findOne({
        'email.value': req.body.value,
      }, handleDbError(res)((user) => {
        if (!user) {
          res.json({
            isPassed: false,
            message: 'This is an invalid account',
          });
        } else {
          res.json({
            isPassed: true,
          });
        }
      }));
    },
  },
};
