// @flow
const {
  ORDER_PHASE_NEXT_PAGE,
  ORDER_PHASE_PREVIOUS_PAGE,
  ORDER_PHASE_SET_PAGE,
} = require('../../constants/ActionTypes').default

export const orderPhaseNextPage = () => {
  return {
    type: ORDER_PHASE_NEXT_PAGE,
  }
}

export const orderPhasePreviousPage = () => {
  return {
    type: ORDER_PHASE_PREVIOUS_PAGE,
  }
}

export const orderPhaseSetPage = (page: number) => {
  return {
    type: ORDER_PHASE_SET_PAGE,
    payload: {
      page,
    },
  }
}
