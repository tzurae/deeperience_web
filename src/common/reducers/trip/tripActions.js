const {
  SET_OWN_SITE,
  SET_CREATE_TRIP_DATA,
  RESET_CREATE_TRIP_DATA,
  CREATE_TRIP_ERROR,
} = require('../../constants/ActionTypes').default

export const setOwnSite = (sites) => {
  return {
    type: SET_OWN_SITE,
    payload: sites,
  }
}

export const setCreateTripData = (data) => {
  return {
    type: SET_CREATE_TRIP_DATA,
    payload: data,
  }
}

export const resetCreateTripData = () => {
  return {
    type: RESET_CREATE_TRIP_DATA,
  }
}

export const createTripError = (error) => {
  return {
    type: CREATE_TRIP_ERROR,
    payload: error,
  }
}
