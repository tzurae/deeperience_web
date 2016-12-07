import InitialState from './siteInitialState'
import uuid from 'uuid'

const {
    CREATE_SITE_ERROR,
} = require('../../constants/ActionTypes').default

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /*
    case CREATE_SITE_NEXT_PAGE:
      return state.set('page', state.get('page') + 1)

    case CREATE_SITE_PREVIOUS_PAGE:
      return state.set('page', state.get('page') - 1)

    case CREATE_SITE_SET_PAGE:
      return state.set('page', action.payload)
    */

    case CREATE_SITE_ERROR:
      return state.set('error', action.payload)

    default:
      return state
  }
}
