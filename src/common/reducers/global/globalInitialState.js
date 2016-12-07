import { Record, Map } from 'immutable'
const InitialState = Record({
  apiEngine: null,
  locale: '', // intl locale
  messages: new Map({}), // intl messages
})

export default InitialState
