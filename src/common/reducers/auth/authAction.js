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

  GET_DATA_FROM_API_SERVER_REQUEST,
  GET_DATA_FROM_API_SERVER_SUCCESS,
  GET_DATA_FROM_API_SERVER_FAILURE,

} = require('../../constants/ActionTypes').default

export const login         = createAction(LOGIN)
export const loginRequest  = createAction(LOGIN_REQUEST)
export const loginSuccess  = createAction(LOGIN_SUCCESS)
export const loginFailure  = createAction(LOGIN_FAILURE)

export const logout        = createAction(LOGOUT)
export const logoutRequest = createAction(LOGOUT_REQUEST)
export const logoutSuccess = createAction(LOGOUT_SUCCESS)
export const logoutFailure = createAction(LOGOUT_FAILURE)

export const getDataFromApiServerRequest = createAction(GET_DATA_FROM_API_SERVER_REQUEST)
export const getDataFromApiServerSuccess = createAction(GET_DATA_FROM_API_SERVER_SUCCESS)
export const getDataFromApiServerFailure = createAction(GET_DATA_FROM_API_SERVER_FAILURE)
