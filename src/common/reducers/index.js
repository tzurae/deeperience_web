import { combineReducers } from 'redux';
import cookie from './cookieReducer';
import errors from './errorReducer';
import apiEngine from './apiEngineReducer';
import todos from './todoReducer';
import form from './formReducer';
import intl from './intlReducer';

const rootReducer = combineReducers({
  cookie,
  errors,
  apiEngine,
  todos,
  form,
  intl,
});

export default rootReducer;
