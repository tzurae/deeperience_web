import env from '../utils/env';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import LocaleProvider from '../../common/components/utils/LocaleProvider';
import Html from '../components/Html';
import getRoutes from '../../common/routes';

export default {
  render(req, res) {
    if (env === 'development') {
      __webpackIsomorphicTools__.refresh();
    }
    let routes = getRoutes(req.store);
    match({
      routes,
      // we use `history: req.history` instead of `location: req.url` to deal with redirections
      history: req.history,
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
      const finalState = req.store.getState();
      const markup = '<!doctype html>\n' + renderToString(
        <Html
          initialState={finalState}
          assets={__webpackIsomorphicTools__.assets()}
        >
          <Provider store={req.store}>
            <LocaleProvider>
              <RouterContext {...renderProps} />
            </LocaleProvider>
          </Provider>
        </Html>
      );
      res.send(markup);
    });
  },
};
