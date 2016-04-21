import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from './views/layouts/AppLayout';
import HomePage from './views/pages/HomePage';
import NotFoundPage from './views/pages/NotFoundPage';

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={HomePage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);