import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Router from './Router';
import scenes from './scenes';

let store = createStore(rootReducer, applyMiddleware(thunk));

let App = () => (
  <Provider store={store}>
    <Router>
      {scenes}
    </Router>
  </Provider>
);

export default App;
