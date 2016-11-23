import ActionTypes from '../constants/ActionTypes'

export const setOwnSite = (sites) => {
  return {
    type: ActionTypes.SET_OWN_SITE,
    payload: sites,
  }
}

export const setCreateTripData = (data) => {
  return {
    type: ActionTypes.SET_CREATE_TRIP_DATA,
    payload: data,
  }
}

export const resetCreateTripData = () => {
  return {
    type: ActionTypes.RESET_CREATE_TRIP_DATA,
  }
}

export const createTripError = (error) => {
  return {
    type: ActionTypes.CREATE_TRIP_ERROR,
    payload: error,
  }
}
