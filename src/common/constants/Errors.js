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
    status: 400,
    title: 'Database Operation Failed',
    detail: 'Current database operation is invalid.',
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
    detail: 'Please login to access the resource.',
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
  [ErrorCodes.USER_TOKEN_EXPIRATION]: {
    code: ErrorCodes.USER_TOKEN_EXPIRATION,
    status: 401,
    title: 'Token Expired',
    detail: 'Your jwt token expired. Please re-login.',
  },
  [ErrorCodes.USER_CONFLICT]: {
    code: ErrorCodes.USER_CONFLICT,
    status: 400,
    title: 'User Already Exists',
    detail: 'The user already exists.',
  },
};
