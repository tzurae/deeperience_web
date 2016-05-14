import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, Router, browserHistory } from 'react-router';
import LocaleProvider from '../common/views/components/LocaleProvider';
import rootReducer from '../common/reducers';
import routes from '../common/routes';
import setupLocale from './setupLocale';

setupLocale();
const initialState = window.__INITIAL_STATE__;
let store = createStore(rootReducer, initialState);

// refs:
// - <http://www.jianshu.com/p/b3ff1f53faaf>
// - <https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes>
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
