import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../common/reducers';
import ApiEngine from '../../common/utils/ApiEngine';
import { setApiEngine } from '../../common/actions/apiEngine';

export default (req, res, next) => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  req.store = store;
  let apiEngine = new ApiEngine(req);
  req.store.dispatch(setApiEngine(apiEngine));
  next();
};
