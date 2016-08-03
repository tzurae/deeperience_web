import actionTypes from '../constants/actionTypes';

export const pushError = (error, meta) => {
  return {
    type: actionTypes.PUSH_ERRORS,
    errors: [{
      ...error,
      meta,
    }],
  };
};

export const pushErrors = (errors) => {
  return {
    type: actionTypes.PUSH_ERRORS,
    errors,
  };
};

export const removeError = (id) => {
  return {
    type: actionTypes.REMOVE_ERROR,
    id,
  };
};
