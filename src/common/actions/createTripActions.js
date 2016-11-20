import ActionTypes from '../constants/ActionTypes'

export const setPage = (page) => {
  return {
    type: ActionTypes.CREATE_TRIP_SET_PAGE,
    payload: page,
  }
}

export const nextPage = () => {
  return {
    type: ActionTypes.CREATE_TRIP_NEXT_PAGE,
  }
}

export const previousPage = () => {
  return {
    type: ActionTypes.CREATE_TRIP_PREVIOUS_PAGE,
  }
}
