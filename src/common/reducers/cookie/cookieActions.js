// import cookie from 'cookie'
// import assign from 'object-assign'

import { createAction } from 'redux-actions'

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

export const setCookie = createAction(SET_COOKIE)
export const setCookieRequest = createAction(SET_COOKIE_REQUEST)
export const setCookieSuccess = createAction(SET_COOKIE_SUCCESS)
export const setCookieFailure = createAction(SET_COOKIE_FAILURE)

export const removeCookie = createAction(REMOVE_COOKIE)
export const removeCookieRequest = createAction(REMOVE_COOKIE_REQUEST)
export const removeCookieSuccess = createAction(REMOVE_COOKIE_SUCCESS)
export const removeCookieFailure = createAction(REMOVE_COOKIE_FAILURE)

