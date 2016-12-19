const {
  CREATE_SITE_ERROR,
  CREATE_SITE_NEXT_PAGE,
  CREATE_SITE_PREVIOUS_PAGE,
  CREATE_SITE_SET_PAGE,
  CREATE_SITE_SET_SUBSITE_ACTIVE,
  CREATE_SITE_SET_DONE,
} = require('../../constants/ActionTypes').default

export const createSiteError = error => ({
  type: CREATE_SITE_ERROR,
  payload: {
    error,
  },
})

export const createSiteNextPage = () => ({
  type: CREATE_SITE_NEXT_PAGE,
})

export const createSitePreviousPage = () => ({
  type: CREATE_SITE_PREVIOUS_PAGE,
})

export const createSiteSetPage = page => ({
  type: CREATE_SITE_SET_PAGE,
  payload: {
    page,
  },
})

export const createSiteSetSubsiteActive = arr => ({
  type: CREATE_SITE_SET_SUBSITE_ACTIVE,
  payload: {
    arr,
  },
})

export const createSiteSetDone = done => ({
  type: CREATE_SITE_SET_DONE,
  payload: {
    done,
  },
})
