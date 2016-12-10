const {
    CREATE_SITE_ERROR,
} = require('../../constants/ActionTypes').default

export const createSiteError = (error) => {
  return {
    type: CREATE_SITE_ERROR,
    payload: error,
  }
}
