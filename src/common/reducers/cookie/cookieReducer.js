import cookie from 'cookie'
import Immutable from 'immutable'

const {
  SET_COOKIE,
} = require('../../constants/ActionTypes').default

const initialState = Immutable.fromJS({
  lang: null,
  user: null,
  token: null,
  redirect: null,
  locale: null,
})

if (process.env.BROWSER) {
  initialState.set(cookie.parse(document.cookie))
  // initCookies = cookie.parse(document.cookie)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIE:
      // you need to transfer the value type, because the data you want to transmit
      // must be a simple string when using serialize of "cookie" package
      let value
      if (typeof action.cookie.value === 'object') {
        value = JSON.stringify(action.cookie.value)
      } else {
        value = action.cookie.value
      }
      return state.set(action.cookie.name, value)
      // const cookiePair = {}
      // let value = action.cookie.value
      // if (typeof action.cookie.value === 'string') {
      //   value = action.cookie.value
      // } else if (typeof action.cookie.value === 'object') {
      //   value = JSON.stringify(action.cookie.value)
      // }
      // cookiePair[action.cookie.name] = value
      // return {
      //   ...state,
      //   ...cookiePair,
      // }
    default:
      return state
  }
}
