import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../common/reducers';

export default (req, res, next) => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  req.store = store;
  next();
};
