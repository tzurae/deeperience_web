import { handleDbError } from '../decorators/handleError';
import User from '../models/User';

export default {
  register: {
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
};
