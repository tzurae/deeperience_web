import { combineReducers } from 'redux';
import todos from './todoReducer';
import user from './userReducer';
import form from './formReducer';
import intl from './intlReducer';

const rootReducer = combineReducers({
  todos,
  user,
  form,
  intl,
});

export default rootReducer;
