import { Record } from 'immutable'
const InitialState = Record({
  apiEngine: null,
  locale: '', // intl locale
  messages: {}, // intl messages
})

export default InitialState
