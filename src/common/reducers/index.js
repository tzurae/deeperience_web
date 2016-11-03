import { combineReducers } from 'redux';
import routing from './routerReducer';
import cookies from './cookieReducer';
import errors from './errorReducer';
import apiEngine from './apiEngineReducer';
import pages from './pageReducer';
import todos from './todoReducer';
import form from './formReducer';
import intl from './intlReducer';

const rootReducer = combineReducers({
  routing,
  cookies,
  errors,
  apiEngine,
  pages,
  todos,
  form, // must mount as `form` from redux-form's docs
  intl,
});

export default rootReducer;
