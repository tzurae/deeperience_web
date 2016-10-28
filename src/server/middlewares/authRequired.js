import passport from 'passport';
import handleError, { handleJwtError } from '../decorators/handleError';
import Errors from '../../common/constants/Errors';

const authRequired = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    handleError(res)((user, info) => {
      handleJwtError(res)((user) => {
        if (!user) {
          res.pushError(Errors.USER_UNAUTHORIZED);
          return res.errors();
        }
        req.user = user;
        next();
      })(info, user);
    })
  )(req, res, next);
};

export default authRequired;
