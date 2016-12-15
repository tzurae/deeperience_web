import { combineReducers } from 'redux-immutable'
import global from './global/globalReducer'
import trip from './trip/tripReducer'
import routing from './router/routerReducer'
import cookies from './cookie/cookieReducer'
import errors from './error/errorReducer'
import pages from './page/pageReducer'
import form from './form/formReducer'
import site from './site/siteReducer'
import custom from './custom/customReducer'
import order from './order/orderReducer'

export const rootReducer = combineReducers({
  global,
  routing,
  cookies,
  errors,
  pages,
  form, // must mount as `form` from redux-form's docs
  trip,
  site,
  custom,
  order,
})
