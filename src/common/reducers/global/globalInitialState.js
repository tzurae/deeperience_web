'use strict'
import { Record } from 'immutable'
const InitialState = Record({
  apiEngine: null,
  locale: null, // intl locale
  messages: null, // intl messages
})

export default InitialState
