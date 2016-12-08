// @flow
const {
  CUSTOM_PHASE_NEXT_PAGE,
  CUSTOM_PHASE_PREVIOUS_PAGE,
  CUSTOM_PHASE_SET_PAGE,
} = require('../../constants/ActionTypes').default

export const customPhaseNextPage = () => {
  return {
    type: CUSTOM_PHASE_NEXT_PAGE,
  }
}

export const customPhasePreviousPage = () => {
  return {
    type: CUSTOM_PHASE_PREVIOUS_PAGE,
  }
}

export const customPhaseSetPage = (page: number) => {
  return {
    type: CUSTOM_PHASE_SET_PAGE,
    payload: {
      page,
    },
  }
}
