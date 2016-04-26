import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from './views/layouts/AppLayout';
import HomePage from './views/pages/HomePage';
import RegisterPage from './views/pages/user/RegisterPage';
import LoginPage from './views/pages/user/LoginPage';
import NotFoundPage from './views/pages/NotFoundPage';

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={HomePage} />
    <Route path="user/register" component={RegisterPage} />
    <Route path="user/login" component={LoginPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);