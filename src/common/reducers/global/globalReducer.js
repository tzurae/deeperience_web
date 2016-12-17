import Immutable, { Map } from 'immutable'

const {
  SET_API_ENGINE,
  UPDATE_LOCALE,
} = require('../../constants/ActionTypes').default

const initialState = Immutable.fromJS({
  apiEngine: null,
  locale: null, // intl locale
  messages: null, // intl messages
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_API_ENGINE:
      return state.set('apiEngine', action.apiEngine)

    case UPDATE_LOCALE:
      return state.set('locale', action.locale)
                  .set('messages', new Map(action.messages))
    default:
      return state
  }
}
