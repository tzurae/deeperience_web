// @flow weak
import Errors from '../../constants/Errors'
const {
  PUSH_ERRORS,
  REMOVE_ERROR,
} = require('../../constants/ActionTypes').default

export const pushError = (error, meta) => {
  return {
    type: PUSH_ERRORS,
    payload: {
      errors: [{
        ...error,
        meta,
      }],
    },
  }
}

export const pushErrors = (errors: Array<Object>) => {
  if (errors && errors.length === undefined) {
    return pushError(Errors.UNKNOWN_EXCEPTION, errors)
  }
  return {
    type: PUSH_ERRORS,
    payload: {
      errors,
    },
  }
}

export const removeError = (id) => {
  return {
    type: REMOVE_ERROR,
    id,
  }
}
