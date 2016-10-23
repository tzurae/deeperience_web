import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { useRouterHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from '../../common/reducers';
import ApiEngine from '../../common/utils/ApiEngine';
import { setApiEngine } from '../../common/actions/apiEngine';

export default (req, res, next) => {
  // ref:
  //  - <https://github.com/reactjs/react-router-redux/issues/182#issuecomment-178701502>
  //  - <http://stackoverflow.com/questions/34821921/browserhistory-undefined-with-react-router-2-00-release-candidates>
  //  - <https://github.com/reactjs/react-router-redux/blob/master/examples/server/server.js>
  let memoryHistory = useRouterHistory(createMemoryHistory)(req.url);
  let store = createStore(
    rootReducer,
    applyMiddleware(
      routerMiddleware(memoryHistory),
      thunk
    )
  );
  let history = syncHistoryWithStore(memoryHistory, store);
  req.store = store;
  req.history = history;
  let apiEngine = new ApiEngine(req);
  req.store.dispatch(setApiEngine(apiEngine));
  next();
};
