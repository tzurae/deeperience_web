export default (apiEngine) => ({
  list: ({ page }) => apiEngine.get('/api/users', { params: { page } }),
  register: (user) => apiEngine.post('/api/users', { data: user }),
  login: (user) => apiEngine.post('/api/users/login', { data: user }),
  logout: () => apiEngine.get('/api/users/logout'),
  show: () => apiEngine.get('/api/users/me'),
  update: (user) => apiEngine.put('/api/users/me', { data: user }),
  uploadAvatar: (avatar) =>
    apiEngine.post('/api/users/me/avatar', { files: { avatar } }),
});
