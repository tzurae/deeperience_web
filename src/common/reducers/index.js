import { combineReducers } from 'redux'
import routing from './router/routerReducer'
import cookies from './cookie/cookieReducer'
import errors from './error/errorReducer'
import apiEngine from './apiEngine/apiEngineReducer'
import pages from './page/pageReducer'
import todos from './todo/todoReducer'
import form from './form/formReducer'
import intl from './intl/intlReducer'
import trip from './trip/tripReducer'

const rootReducer = combineReducers({
  routing,
  cookies,
  errors,
  apiEngine,
  pages,
  todos,
  form, // must mount as `form` from redux-form's docs
  intl,
  trip,
})

export default rootReducer
