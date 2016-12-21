const {
  CREATE_SITE_ERROR,
  CREATE_SITE_NEXT_PAGE,
  CREATE_SITE_PREVIOUS_PAGE,
  CREATE_SITE_SET_PAGE,
  CREATE_SITE_SET_SUBSITE_ACTIVE,
  CREATE_SITE_SET_DONE,
  CREATE_SITE_UPDATE_INTRO_EDITOR,
  CREATE_SITE_UPDATE_MAIN_SITE_EDITOR,
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

export const createSiteSetDone = done => ({
  type: CREATE_SITE_SET_DONE,
  payload: {
    done,
  },
})

export const createSiteSetSubsiteActive = (arr) => {
  return {
    type: CREATE_SITE_SET_SUBSITE_ACTIVE,
    payload: {
      arr,
    },
  }
}

export const createSiteUpdateIntroEditor = (nextContent) => {
  return {
    type: CREATE_SITE_UPDATE_INTRO_EDITOR,
    payload: {
      nextContent,
    },
  }
}

export const createSiteUpdateMainSiteEditor = (nextContent) => {
  return {
    type: CREATE_SITE_UPDATE_MAIN_SITE_EDITOR,
    payload: {
      nextContent,
    },
  }
}
