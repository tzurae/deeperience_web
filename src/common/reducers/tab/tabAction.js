import { createAction } from 'redux-actions'
const {
  TAB_CHANGE
} = require('../../constants/ActionTypes').default

export const tabChange = createAction(TAB_CHANGE)