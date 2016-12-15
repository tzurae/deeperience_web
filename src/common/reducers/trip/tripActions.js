// @flow
const {
  SET_OWN_SITE,
  SET_CREATE_TRIP_DATA,
  RESET_CREATE_TRIP_DATA,
  CREATE_TRIP_ERROR,
  CREATE_TRIP_NEXT_PAGE,
  CREATE_TRIP_PREVIOUS_PAGE,
  CREATE_TRIP_SET_PAGE,
} = require('../../constants/ActionTypes').default

export const setOwnSite = (sites: any) => {
  return {
    type: SET_OWN_SITE,
    payload: {
      sites,
    },
  }
}

type tripType = {
  tripInfo: any,
  routes: any,
  startSites: Array<string>,
  uuid2data: any,
};

// see components/forms/trip/fakeData
export const setCreateTripData = (data: tripType) => {
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

export const createTripError = (error: string) => {
  return {
    type: CREATE_TRIP_ERROR,
    payload: {
      error,
    },
  }
}

export const createTripNextPage = () => {
  return {
    type: CREATE_TRIP_NEXT_PAGE,
  }
}

export const createTripPreviousPage = () => {
  return {
    type: CREATE_TRIP_PREVIOUS_PAGE,
  }
}

export const createTripSetPage = (page: number) => {
  return {
    type: CREATE_TRIP_SET_PAGE,
    payload: {
      page,
    },
  }
}
