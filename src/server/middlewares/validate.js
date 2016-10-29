import Errors from '../../common/constants/Errors';
import { handleDbError } from '../decorators/handleError';
import User from '../models/User';

export default {
  form: (formPath, onlyFields = []) => (req, res, next) => {
    let { validate } = require(`../../common/components/forms/${formPath}`);
    let errors = validate(req.body);

    if (onlyFields.length > 0) {
      let newErrors = {};
      onlyFields.forEach((field) => {
        newErrors[field] = errors[field];
      });
      errors = newErrors;
    }

    if (Object.keys(errors).length > 0) {
      res.pushError(Errors.INVALID_DATA, {
        errors,
      });
      return res.errors();
    }
    next();
  },

  verifyUserNonce: (nonceKey) => (req, res, next) => {
    let { _id, nonce } = req.decodedPayload;
    User.findById(_id, handleDbError(res)((user) => {
      if (nonce !== user.nonce[nonceKey]) {
        return res.errors([Errors.TOKEN_REUSED]);
      }
      user.nonce[nonceKey] = -1;
      req.user = user;
      next();
    }));
  },
};
