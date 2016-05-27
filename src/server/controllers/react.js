import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import LocaleProvider from '../../common/components/LocaleProvider';
import getRoutes from '../../common/routes';

// jscs:disable
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
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
  <script src="/js/bundle.js"></script>
</body>
</html>`);
// jscs:enable

export default {
  render(req, res) {
    let routes = getRoutes(req.store);
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
      const markup = renderToString(
        <Provider store={req.store}>
          <LocaleProvider>
            <RouterContext {...renderProps} />
          </LocaleProvider>
        </Provider>
      );
      const finalState = req.store.getState();
      const page = renderFullPage(markup, finalState);
      res.send(page);
    });
  },
};
