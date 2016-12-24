import Errors from '../../constants/Errors'
const {
  PUSH_ERRORS,
  REMOVE_ERROR,
} = require('../../constants/ActionTypes')

export const pushError = (error, meta) => {
  return {
    type: PUSH_ERRORS,
    errors: [{
      ...error,
      meta,
    }],
  }
}

export const pushErrors = (errors) => {
  if (errors && errors.length === undefined) {
    return pushError(Errors.UNKNOWN_EXCEPTION, errors)
  }
  return {
    type: PUSH_ERRORS,
    errors,
  }
}

export const removeError = (id) => {
  return {
    type: REMOVE_ERROR,
    id,
  }
}
