import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from '../../common/routes';
import rootReducer from '../../common/reducers';

const renderFullPage = (markup, initialState) => (
`<!doctype html>
<html lang="utf-8">
<head>
  <title>Express-React-HMR-Boilerplate</title>
</head>
<body>
  <div id="root">${markup}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>
  <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
  <script src="/js/bundle.js"></script>
</body>
</html>`);

export default {
  render(req, res) {
    match({
      routes,
      location: req.url,
    }, (error, redirectLocation, renderProps) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      if (redirectLocation) {
        return res.redirect(
          302, redirectLocation.pathname + redirectLocation.search);
      }
      if (renderProps == null) {
        return res.status(404).send('Not found');
      }
      const initialState = res.SSRState;
      const store = createStore(rootReducer, initialState);
      const markup = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const finalState = store.getState();
      const page = renderFullPage(markup, finalState);
      res.send(page);
    });
  },
};