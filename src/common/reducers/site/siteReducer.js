import InitialState from './siteInitialState'

const {
    CREATE_SITE_ERROR,
} = require('../../constants/ActionTypes').default

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case CREATE_SITE_ERROR:
      return state.set('error', action.payload)

    default:
      return state
  }
}
