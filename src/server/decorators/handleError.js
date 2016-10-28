import ErrorTypes from '../constants/ErrorTypes';
import Errors from '../../common/constants/Errors';

let getErrorHandler = (errorTypes) => (res) => (fn) => (err, ...result) => {
  if (err) {
    if (!Array.isArray(errorTypes)) {
      errorTypes = [errorTypes];
    }
    errorTypes.forEach((errorType) => {
      switch (errorType) {
        case ErrorTypes.ODM_OPERATION: {
          if (err.name === 'ValidationError') {
            res.pushError(Errors.ODM_VALIDATION, err);
            return res.errors();
          }
          if (err.name === 'MongooseError') {
            res.pushError(Errors.ODM_OPERATION_FAIL, err);
            return res.errors();
          }
          break;
        }
        case ErrorTypes.JSON_WEB_TOKEN: {
          // ref:
          //   - <https://github.com/auth0/node-jsonwebtoken#errors--codes>
          if (err.name === 'JsonWebTokenError') {
            res.pushError(Errors.BAD_TOKEN, err);
            return res.errors();
          } else if (err.name === 'TokenExpiredError') {
            res.pushError(Errors.TOKEN_EXPIRATION, err);
            return res.errors();
          }
          break;
        }
        case ErrorTypes.PASSPORT: {
          if (err.message === 'No auth token') {
            res.pushError(Errors.USER_UNAUTHORIZED, err);
            return res.errors();
          }
          break;
        }
        default: {
          res.pushError(Errors.UNKNOWN_EXCEPTION, err);
        }
      }
    });
  } else {
    fn(...result);
  }
};

let handleError = getErrorHandler(null);
let handleDbError = getErrorHandler(ErrorTypes.ODM_OPERATION);
let handleJwtError = getErrorHandler(ErrorTypes.JSON_WEB_TOKEN);
let handlePassportError = getErrorHandler([
  ErrorTypes.JSON_WEB_TOKEN,
  ErrorTypes.PASSPORT,
]);

export {
  handleDbError,
  handleJwtError,
  handlePassportError,
};
export default handleError;
