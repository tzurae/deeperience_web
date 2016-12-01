import { combineReducers } from 'redux'
import routing from './router/routerReducer'
import cookies from './cookie/cookieReducer'
import errors from './error/errorReducer'
import global from './global/globalReducer'
import pages from './page/pageReducer'
import todos from './todo/todoReducer'
import form from './form/formReducer'
import intl from './intl/intlReducer'
import trip from './trip/tripReducer'

export const rootReducer = combineReducers({
  global,
  routing,
  cookies,
  errors,
  pages,
  todos,
  form, // must mount as `form` from redux-form's docs
  intl,
  trip,
})
