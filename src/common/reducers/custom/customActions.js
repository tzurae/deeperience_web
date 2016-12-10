// @flow
const {
  CUSTOM_PHASE_NEXT_PAGE,
  CUSTOM_PHASE_PREVIOUS_PAGE,
  CUSTOM_PHASE_SET_PAGE,
  CUSTOM_PHASE_OPEN_ADVICE_MODAL,
  CUSTOM_PHASE_CLOSE_ADVICE_MODAL,
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

export const customPhaseOpenAdviceModal = () => {
  return {
    type: CUSTOM_PHASE_OPEN_ADVICE_MODAL,
  }
}

export const customPhaseCloseAdviceModal = () => {
  return {
    type: CUSTOM_PHASE_CLOSE_ADVICE_MODAL,
  }
}
