// import cookie from 'cookie'
import cookie from 'js-cookie'
import { fromJS } from 'immutable'
import createReducer from '../../lib/configureReducer'

const {
  SET_COOKIE,
  SET_COOKIE_REQUEST,
  SET_COOKIE_SUCCESS,
  SET_COOKIE_FAILURE,

  REMOVE_COOKIE,
  REMOVE_COOKIE_REQUEST,
  REMOVE_COOKIE_SUCCESS,
  REMOVE_COOKIE_FAILURE,

} = require('../../constants/ActionTypes').default

const initialState = fromJS({
  lang: '',
  user: {},
  token: '',
  redirect: '',
  locale: '',
})

export default createReducer(initialState, {
  [SET_COOKIE](state, action){return state},
  [SET_COOKIE_REQUEST] (state, action) {
    if(process.env.BROWSER) {
      Object.keys(action.payload).map(cookieEle => {
        //js-cookie will automatically transfer object to string using JSON.stringify
        document.cookie = cookie.set(cookieEle, action.payload[cookieEle])
        }
      )
    }
    return state.merge(action.payload)
  },
  [SET_COOKIE_SUCCESS](state, action){return state},
  [SET_COOKIE_FAILURE](state, action){return state},
  [REMOVE_COOKIE](state, action){return state},
  [REMOVE_COOKIE_REQUEST] (state, action) {
    if(process.env.BROWSER) {
      document.cookie.split(";").forEach(
        function(c) {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }
    return state.merge(initialState)
  },
  [REMOVE_COOKIE_SUCCESS](state, action){return state},
  [REMOVE_COOKIE_FAILURE](state, action){return state},
})




// if (process.env.BROWSER) {
//   initialState.set(cookie.parse(document.cookie))
//   // initCookies = cookie.parse(document.cookie)
// }
//
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_COOKIE:
//       // you need to transfer the value type, because the data you want to transmit
//       // must be a simple string when using serialize of "cookie" package
//       let value
//       if (typeof action.cookie.value === 'object') {
//         value = JSON.stringify(action.cookie.value)
//       } else {
//         value = action.cookie.value
//       }
//       return state.set(action.cookie.name, value)
//       // const cookiePair = {}
//       // let value = action.cookie.value
//       // if (typeof action.cookie.value === 'string') {
//       //   value = action.cookie.value
//       // } else if (typeof action.cookie.value === 'object') {
//       //   value = JSON.stringify(action.cookie.value)
//       // }
//       // cookiePair[action.cookie.name] = value
//       // return {
//       //   ...state,
//       //   ...cookiePair,
//       // }
//     default:
//       return state
//   }
// }
