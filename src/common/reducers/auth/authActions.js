/*
* ## Edit by: Rae
* ## Time: 2016/12/07
*/
import { createAction } from 'redux-actions'

// need to add the default behind require, or the result will be undefined
const {

  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  REGISTER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

  OPEN_REGISTER_VERIFY_MODAL,
  CLOSE_REGISTER_VERIFY_MODAL,

  SET_USER,
  REMOVE_USER,
} = require('../../constants/ActionTypes').default

export const login         = createAction(LOGIN)
export const loginRequest  = createAction(LOGIN_REQUEST)
export const loginSuccess  = createAction(LOGIN_SUCCESS)
export const loginFailure  = createAction(LOGIN_FAILURE)

export const logout        = createAction(LOGOUT)
export const logoutRequest = createAction(LOGOUT_REQUEST)
export const logoutSuccess = createAction(LOGOUT_SUCCESS)
export const logoutFailure = createAction(LOGOUT_FAILURE)

export const register = createAction(REGISTER)
export const registerRequest = createAction(REGISTER_REQUEST)
export const registerSuccess = createAction(REGISTER_SUCCESS)
export const registerFailure = createAction(REGISTER_FAILURE)

export const openRegisterVerifyModal = createAction(OPEN_REGISTER_VERIFY_MODAL)
export const closeRegisterVerifyModal = createAction(CLOSE_REGISTER_VERIFY_MODAL)

export const setUser = createAction(SET_USER)
export const removeUser = createAction(REMOVE_USER)
