import InitialState from './customInitialState'

const {
  CUSTOM_PHASE_NEXT_PAGE,
  CUSTOM_PHASE_PREVIOUS_PAGE,
  CUSTOM_PHASE_SET_PAGE,
  CUSTOM_PHASE_OPEN_ADVICE_MODAL,
  CUSTOM_PHASE_CLOSE_ADVICE_MODAL,
} = require('../../constants/ActionTypes').default

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case CUSTOM_PHASE_NEXT_PAGE:
      return state.set('page', state.get('page') + 1)

    case CUSTOM_PHASE_PREVIOUS_PAGE:
      return state.set('page', state.get('page') - 1)

    case CUSTOM_PHASE_SET_PAGE:
      return state.set('page', action.payload.page)

    case CUSTOM_PHASE_OPEN_ADVICE_MODAL:
      return state.set('isAdviceModal', true)

    case CUSTOM_PHASE_CLOSE_ADVICE_MODAL:
      return state.set('isAdviceModal', false)

    default:
      return state
  }
}
