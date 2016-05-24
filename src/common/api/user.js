import api from '../utils/webAPIUtils';

export default {
  register: (user) => api.post('/api/user', user),
  login: (user) => api.post('/api/user/login', user),
  logout: () => api.get('/api/user/logout'),
  show: () => api.getAuth('/api/user/me'),
  update: (user) => api.putAuth('/api/user/me', user),
  uploadAvatar: (avatar) => api.postFormAuth('/api/user/me/avatar', avatar),
};
