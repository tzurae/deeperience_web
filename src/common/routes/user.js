import authRequired from '../utils/authRequired';
import RegisterPage from '../views/pages/user/RegisterPage';
import LoginPage from '../views/pages/user/LoginPage';
import LogoutPage from '../views/pages/user/LogoutPage';
import ShowPage from '../views/pages/user/ShowPage';

export default {
  path: 'user',
  childRoutes: [{
    path: 'register',
    component: RegisterPage,
  }, {
    path: 'login',
    component: LoginPage,
  }, {
    path: 'logout',
    component: LogoutPage,
  }, {
    path: 'me',
    component: ShowPage,
    onEnter: authRequired,
  }, ],
};
