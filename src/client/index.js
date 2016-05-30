import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { match, Router, browserHistory } from 'react-router';
import LocaleProvider from '../common/components/LocaleProvider';
import rootReducer from '../common/reducers';
import getRoutes from '../common/routes';
import setupLocale from './setupLocale';
import setupNProgress from './setupNProgress';
import { setApiEngine } from '../common/actions/apiEngine';
import ApiEngine from '../common/utils/ApiEngine';

setupNProgress();
setupLocale();
const initialState = window.__INITIAL_STATE__;
let store = createStore(rootReducer, initialState, applyMiddleware(thunk));

let apiEngine = new ApiEngine();
store.dispatch(setApiEngine(apiEngine));

// refs:
// - <http://www.jianshu.com/p/b3ff1f53faaf>
// - <https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes>
let routes = getRoutes(store);
match({
  history: browserHistory,
  routes,
}, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <LocaleProvider>
        <Router history={browserHistory} {...renderProps}>
          {routes}
        </Router>
      </LocaleProvider>
    </Provider>
  , document.getElementById('root'));
});
