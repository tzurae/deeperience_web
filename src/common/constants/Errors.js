import ErrorCodes from './ErrorCodes';

export default {
  [ErrorCodes.UNKNOWN_EXCEPTION]: {
    code: ErrorCodes.UNKNOWN_EXCEPTION,
    status: 500,
    title: 'Unknown Exception',
    detail: 'Something wrong happened.',
  },
  [ErrorCodes.ODM_OPERATION_FAIL]: {
    code: ErrorCodes.ODM_OPERATION_FAIL,
    status: 500,
    title: 'Database Operation Failed',
    detail: 'Current database operation is invalid.',
  },
  [ErrorCodes.ODM_VALIDATION]: {
    code: ErrorCodes.ODM_VALIDATION,
    status: 400,
    title: 'Database Validation Failed',
    detail: 'The data is invalid.',
  },
  [ErrorCodes.INVALID_RECAPTCHA]: {
    code: ErrorCodes.INVALID_RECAPTCHA,
    status: 400,
    title: 'Invalid Recaptcha',
    detail: 'The value of recaptcha is invalid.',
  },
  [ErrorCodes.STATE_PRE_FETCHING_FAIL]: {
    code: ErrorCodes.STATE_PRE_FETCHING_FAIL,
    status: 500,
    title: 'Server-Side State Fetching Failed',
    detail: 'Fail to pre-fetch state on server side.',
  },
  [ErrorCodes.USER_UNAUTHORIZED]: {
    code: ErrorCodes.USER_UNAUTHORIZED,
    status: 401,
    title: 'User Unauthorized',
    detail:
      'You are a guest or invalid user. Please login to access the resource.',
  },
  [ErrorCodes.USER_EXISTED]: {
    code: ErrorCodes.USER_EXISTED,
    status: 400,
    title: 'User Existed',
    detail: 'This user is already registered.',
  },
  [ErrorCodes.BAD_TOKEN]: {
    code: ErrorCodes.BAD_TOKEN,
    status: 400,
    title: 'Bad Token',
    detail: 'Fail to decode the token.',
  },
  [ErrorCodes.TOKEN_EXPIRATION]: {
    code: ErrorCodes.TOKEN_EXPIRATION,
    status: 401,
    title: 'Token Expired',
    detail: 'Your token has expired.',
  },
  [ErrorCodes.PERMISSION_DENIED]: {
    code: ErrorCodes.PERMISSION_DENIED,
    status: 403,
    title: 'Permission Denied',
    detail: 'You are not allowed to access the resource.',
  },
  [ErrorCodes.LOCALE_NOT_SUPPORTED]: {
    code: ErrorCodes.LOCALE_NOT_SUPPORTED,
    status: 400,
    title: 'Locale not supported',
    detail: 'We don\'t support this locale.',
  },
  [ErrorCodes.AUTHORIZATION_FAIL]: {
    code: ErrorCodes.AUTHORIZATION_FAIL,
    status: 400,
    title: 'Authorization Failed',
    detail: 'Please make sure you authorize all required information to us.',
  },
  [ErrorCodes.SEND_EMAIL_FAIL]: {
    code: ErrorCodes.SEND_EMAIL_FAIL,
    status: 500,
    title: 'Email Not Sent',
    detail: 'Mail service didn\'t send the mail correctly.',
  },
};
