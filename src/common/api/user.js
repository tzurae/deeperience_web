import api from '../utils/webAPIUtils';

export default {
  register: (user) => api.post('/api/user', user),
  login: (user) => api.post('/api/user/login', user),
  logout: () => api.get('/api/user/logout'),
  show: () => api.getAuth('/api/user/me'),
  uploadAvatar: (avatar) => api.postFormAuth('/api/user/me/avatar', avatar),
};
