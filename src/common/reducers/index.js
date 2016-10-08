import { combineReducers } from 'redux';
import cookies from './cookieReducer';
import errors from './errorReducer';
import apiEngine from './apiEngineReducer';
import todos from './todoReducer';
import form from './formReducer';
import intl from './intlReducer';

const rootReducer = combineReducers({
  cookies,
  errors,
  apiEngine,
  todos,
  form,
  intl,
});

export default rootReducer;
