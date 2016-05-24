import { combineReducers } from 'redux';
import cookie from './cookieReducer';
import todos from './todoReducer';
import user from './userReducer';
import form from './formReducer';
import intl from './intlReducer';

const rootReducer = combineReducers({
  cookie,
  todos,
  user,
  form,
  intl,
});

export default rootReducer;
