const {
  CREATE_SITE_NEXT_PAGE,
  CREATE_SITE_PREVIOUS_PAGE,
  CREATE_SITE_SET_PAGE,
} = require('../../constants/ActionTypes')

export const setPage = (page) => {
  return {
    type: CREATE_SITE_SET_PAGE,
    payload: page,
  }
}

export const nextPage = () => {
  return {
    type: CREATE_SITE_NEXT_PAGE,
  }
}

export const previousPage = () => {
  return {
    type: CREATE_SITE_PREVIOUS_PAGE,
  }
}
