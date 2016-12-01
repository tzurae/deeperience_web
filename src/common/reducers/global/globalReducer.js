import InitialState from './globalInitialState'
const {
  SET_API_ENGINE,
  UPDATE_LOCALE,
} = require('../../constants/ActionTypes').default

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case SET_API_ENGINE:
      return state.set('apiEngine', action.apiEngine)

    case UPDATE_LOCALE:
      return state.set('locale', action.locale)
                  .set('messages', action.messages)
    default:
      return state
  }
}
