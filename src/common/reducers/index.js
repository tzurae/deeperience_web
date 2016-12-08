import { combineReducers } from 'redux'
import global from './global/globalReducer'
import trip from './trip/tripReducer'
import routing from './router/routerReducer'
import cookies from './cookie/cookieReducer'
import errors from './error/errorReducer'
import pages from './page/pageReducer'
import todos from './todo/todoReducer'
import form from './form/formReducer'
import createSite from './createSiteReducer'
import custom from './custom/customReducer'

import GlobalInitialState from './global/globalInitialState'
import CustomInitialState from './custom/customInitialState'

export const rootReducer = combineReducers({
  global,
  routing,
  cookies,
  errors,
  pages,
  todos,
  form, // must mount as `form` from redux-form's docs
  trip,
  createSite,
  custom,
})

export const getInitialState = () => ({
  global: new GlobalInitialState(),
  custom: new CustomInitialState(),
})
