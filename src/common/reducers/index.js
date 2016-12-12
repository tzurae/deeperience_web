import { combineReducers } from 'redux'
import global from './global/globalReducer'
import trip from './trip/tripReducer'
import routing from './router/routerReducer'
import cookies from './cookie/cookieReducer'
import errors from './error/errorReducer'
import pages from './page/pageReducer'
import todos from './todo/todoReducer'
import form from './form/formReducer'
import site from './site/siteReducer'
import custom from './custom/customReducer'
import order from './order/orderReducer'

import GlobalInitialState from './global/globalInitialState'
import CustomInitialState from './custom/customInitialState'
import OrderInitialState from './order/orderInitialState'

export const rootReducer = combineReducers({
  global,
  routing,
  cookies,
  errors,
  pages,
  todos,
  form, // must mount as `form` from redux-form's docs
  trip,
  site,
  custom,
  order,
})

export const getInitialState = () => ({
  global: new GlobalInitialState(),
  custom: new CustomInitialState(),
  order: new OrderInitialState(),
})
