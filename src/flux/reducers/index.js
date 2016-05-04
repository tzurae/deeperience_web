import { combineReducers } from 'redux';
import todos from './todoReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  todos,
  user,
});

export default rootReducer;