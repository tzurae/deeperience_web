import fetch from '../utils/webAPIUtils';

export default {
  register: (user) => fetch.post('/api/user', user),
  login: (user) => fetch.post('/api/user/login', user),
  logout: (user) => fetch.get('/api/user/logout'),
  show: (user) => fetch.getAuth('/api/user/me'),
};
