import { combineReducers } from 'redux';
import todos from './todoReducer';
import user from './userReducer';
import form from './formReducer';

const rootReducer = combineReducers({
  todos,
  user,
  form,
});

export default rootReducer;
