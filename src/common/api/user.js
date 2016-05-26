export default (apiEngine) => ({
  register: (user) => apiEngine.post('/api/user', { data: user }),
  login: (user) => apiEngine.post('/api/user/login', { data: user }),
  logout: () => apiEngine.get('/api/user/logout'),
  show: () => apiEngine.get('/api/user/me'),
  update: (user) => apiEngine.put('/api/user/me', { data: user }),
  uploadAvatar: (avatar) =>
    apiEngine.post('/api/user/me/avatar', { files: { avatar } }),
});
