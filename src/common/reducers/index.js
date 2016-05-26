import { combineReducers } from 'redux';
import cookie from './cookieReducer';
import apiEngine from './apiEngineReducer';
import todos from './todoReducer';
import user from './userReducer';
import form from './formReducer';
import intl from './intlReducer';

const rootReducer = combineReducers({
  cookie,
  apiEngine,
  todos,
  user,
  form,
  intl,
});

export default rootReducer;
