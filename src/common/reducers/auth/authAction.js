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
} = require('../../constants/ActionTypes').default

export const login = createAction(LOGIN)
export const loginRequest = createAction(LOGIN_REQUEST)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginFailure = createAction(LOGIN_FAILURE)

