import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import rootReducer from '../common/reducers';
import routes from '../common/routes';

const initialState = window.__INITIAL_STATE__;
let store = createStore(rootReducer, initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
, document.getElementById('root'));