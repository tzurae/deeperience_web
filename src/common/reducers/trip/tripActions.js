// @flow weak
const {
  SET_CREATE_TRIP_DATA,
  RESET_CREATE_TRIP_DATA,
  LIST_GUIDE_SITES,
  LIST_GUIDE_SITES_REQUEST,
  LIST_GUIDE_SITES_SUCCESS,
  LIST_GUIDE_SITES_FAILURE,
  CREATE_TRIP,
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILURE,
  CREATE_TRIP_BRANCH_ERROR,
  CREATE_TRIP_NEXT_PAGE,
  CREATE_TRIP_PREVIOUS_PAGE,
  CREATE_TRIP_SET_PAGE,
  CREATE_TRIP_SET_DONE,
  CREATE_TRIP_SET_SUBMIT_ERROR,
  CREATE_TRIP_SET_SHOW_DAY,
  CREATE_TRIP_SET_TOTAL_DAY,
  CREATE_TRIP_SET_FLOAT_WINDOW,
  CREATE_TRIP_SET_COVER_PIC,
  CREATE_TRIP_SET_TREE_PIC,
} = require('../../constants/ActionTypes').default

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

export const listGuideSites = () => ({
  type: LIST_GUIDE_SITES,
})
export const listGuideSitesRequest = () => ({
  type: LIST_GUIDE_SITES_REQUEST,
})
export const listGuideSitesSuccess = (sites: any) => ({
  type: LIST_GUIDE_SITES_SUCCESS,
  payload: {
    sites,
  },
})
export const listGuideSitesFailure = (error: any) => ({
  type: LIST_GUIDE_SITES_FAILURE,
  payload: {
    error,
  },
})

export const createTrip = (trip:any) => ({
  type: CREATE_TRIP,
  payload: {
    trip,
  },
})

export const createTripRequest = () => ({
  type: CREATE_TRIP_REQUEST,
})

export const createTripSuccess = () => ({
  type: CREATE_TRIP_SUCCESS,
})

export const createTripFailure = (error: any) => ({
  type: CREATE_TRIP_FAILURE,
  payload: {
    error,
  },
})

export const createTripBranchError = (branchError: string) => ({
  type: CREATE_TRIP_BRANCH_ERROR,
  payload: {
    branchError,
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

export const createTripSetDone = (done: Array<boolean>) => ({
  type: CREATE_TRIP_SET_DONE,
  payload: {
    done,
  },
})

export const createTripSetSubmitError = submitError => ({
  type: CREATE_TRIP_SET_SUBMIT_ERROR,
  payload: {
    submitError,
  },
})

export const createTripSetShowDay = (showDay: number) => ({
  type: CREATE_TRIP_SET_SHOW_DAY,
  payload: {
    showDay,
  },
})

export const createTripSetTotalDay = (totalDay: number) => ({
  type: CREATE_TRIP_SET_TOTAL_DAY,
  payload: {
    totalDay,
  },
})

export const createTripSetFloatWindow = floatWindow => ({
  type: CREATE_TRIP_SET_FLOAT_WINDOW,
  payload: {
    floatWindow,
  },
})

export const createTripSetCoverPic = (img :string) => ({
  type: CREATE_TRIP_SET_COVER_PIC,
  payload: {
    img,
  },
})

export const createTripSetTreePic = imgs => ({
  type: CREATE_TRIP_SET_TREE_PIC,
  payload: {
    imgs,
  },
})

