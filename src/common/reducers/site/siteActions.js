const {
  CREATE_SITE_ERROR,
  CREATE_SITE_NEXT_PAGE,
  CREATE_SITE_PREVIOUS_PAGE,
  CREATE_SITE_SET_PAGE,
} = require('../../constants/ActionTypes').default

export const createSiteError = (error) => {
  return {
    type: CREATE_SITE_ERROR,
    payload: error,
  }
}

export const createSiteNextPage = () => {
  return {
    type: CREATE_SITE_NEXT_PAGE,
  }
}

export const createSitePreviousPage = () => {
  return {
    type: CREATE_SITE_PREVIOUS_PAGE,
  }
}

export const createSiteSetPage = (page) => {
  return {
    type: CREATE_SITE_SET_PAGE,
    payload: {
      page,
    },
  }
}
