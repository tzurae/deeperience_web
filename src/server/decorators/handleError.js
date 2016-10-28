import ErrorTypes from '../constants/ErrorTypes';
import Errors from '../../common/constants/Errors';

let getErrorHandler = (ErrorType) => (res) => (fn) => (err, ...result) => {
  if (err) {
    switch (ErrorType) {
      case ErrorTypes.ODM_OPERATION: {
        if (err.name === 'ValidationError') {
          res.pushError(Errors.ODM_VALIDATION, err);
          res.errors();
        } else {
          res.pushError(Errors.ODM_OPERATION_FAIL, err);
        }
        break;
      }
      case ErrorTypes.JSON_WEB_TOKEN: {
        // ref:
        //   - <https://github.com/auth0/node-jsonwebtoken#errors--codes>
        if (err.name === 'JsonWebTokenError') {
          res.pushError(Errors.BAD_TOKEN, err);
        } else if (err.name === 'TokenExpiredError') {
          res.pushError(Errors.TOKEN_EXPIRATION, err);
        }
        res.errors();
        break;
      }
      default: {
        res.pushError(Errors.UNKNOWN_EXCEPTION, err);
      }
    }
  } else {
    fn(...result);
  }
};

let handleError = getErrorHandler(null);
let handleDbError = getErrorHandler(ErrorTypes.ODM_OPERATION);
let handleJwtError = getErrorHandler(ErrorTypes.JSON_WEB_TOKEN);

export { handleDbError, handleJwtError };
export default handleError;
