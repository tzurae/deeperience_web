import InitialState from './orderInitialState'

const {
  ORDER_PHASE_NEXT_PAGE,
  ORDER_PHASE_PREVIOUS_PAGE,
  ORDER_PHASE_SET_PAGE,
} = require('../../constants/ActionTypes').default

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case ORDER_PHASE_NEXT_PAGE:
      return state.set('page', state.get('page') + 1)

    case ORDER_PHASE_PREVIOUS_PAGE:
      return state.set('page', state.get('page') - 1)

    case ORDER_PHASE_SET_PAGE:
      return state.set('page', action.payload.page)

    default:
      return state
  }
}
