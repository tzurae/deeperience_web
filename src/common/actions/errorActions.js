import Errors from '../constants/Errors';
import ActionTypes from '../constants/ActionTypes';

export const pushError = (error, meta) => {
  return {
    type: ActionTypes.PUSH_ERRORS,
    errors: [{
      ...error,
      meta,
    }],
  };
};

export const pushErrors = (errors) => {
  if (errors && errors.length === undefined) {
    return pushError(Errors.UNKNOWN_EXCEPTION, errors);
  }
  return {
    type: ActionTypes.PUSH_ERRORS,
    errors,
  };
};

export const removeError = (id) => {
  return {
    type: ActionTypes.REMOVE_ERROR,
    id,
  };
};
