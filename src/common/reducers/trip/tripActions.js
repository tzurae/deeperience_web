// @flow
const {
  SET_OWN_SITE,
  SET_CREATE_TRIP_DATA,
  RESET_CREATE_TRIP_DATA,
  CREATE_TRIP_ERROR,
  CREATE_TRIP_NEXT_PAGE,
  CREATE_TRIP_PREVIOUS_PAGE,
  CREATE_TRIP_SET_PAGE,
  CREATE_TRIP_SET_DONE,
} = require('../../constants/ActionTypes').default

export const setOwnSite = (sites: any) => ({
  type: SET_OWN_SITE,
  payload: {
    sites,
  },
})

type tripType = {
  tripInfo: any,
  routes: any,
  startSites: Array<string>,
  uuid2data: any,
};

// see components/forms/trip/fakeData
export const setCreateTripData = (data: tripType) => ({
  type: SET_CREATE_TRIP_DATA,
  payload: data,
})

export const resetCreateTripData = () => ({
  type: RESET_CREATE_TRIP_DATA,
})

export const createTripError = (error: string) => ({
  type: CREATE_TRIP_ERROR,
  payload: {
    error,
  },
})

export const createTripNextPage = () => ({
  type: CREATE_TRIP_NEXT_PAGE,
})

export const createTripPreviousPage = () => ({
  type: CREATE_TRIP_PREVIOUS_PAGE,
})

export const createTripSetPage = (page: number) => ({
  type: CREATE_TRIP_SET_PAGE,
  payload: {
    page,
  },
})

export const createTripSetDone = done => ({
  type: CREATE_TRIP_SET_DONE,
  payload: {
    done,
  },
})
